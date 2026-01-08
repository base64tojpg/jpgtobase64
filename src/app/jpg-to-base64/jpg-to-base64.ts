
import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jpg-to-base64',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jpg-to-base64.html',
  styleUrls: ['./jpg-to-base64.scss'],
})
export class JpgToBase64Component {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  fileName: string | null = null;
  dataUrl: string | null = null;
  base64Only: string | null = null;

  error: string | null = null;
  isLoading = false;
  isDragging = false;

  activeTab: 'base64' | 'dataurl' = 'base64';

  constructor(private cdr: ChangeDetectorRef) {}

  // Drag & drop handlers
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.processFile(file);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.processFile(file);
    }
  }

  private async processFile(file: File) {
    this.resetOutput();
    this.fileName = file.name;

    const isJpeg =
      file.type === 'image/jpeg' ||
      file.name.toLowerCase().endsWith('.jpg') ||
      file.name.toLowerCase().endsWith('.jpeg');

    if (!isJpeg) {
      this.error = 'Please choose a JPG/JPEG image.';
      return;
    }

    const maxBytes = 8 * 1024 * 1024;
    if (file.size > maxBytes) {
      this.error = 'File is too large. Please use an image under 8 MB.';
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();

    try {
      const base64 = await this.readFileAsBase64(file);
      this.base64Only = base64;
      this.dataUrl = `data:image/jpeg;base64,${base64}`;
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Failed to read the file.';
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  private async readFileAsBase64(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const chunkSize = 0x8000;
    let binary = '';
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }

    return btoa(binary);
  }

  async copy(text: string | null) {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }

  downloadBase64() {
    if (!this.base64Only) return;

    const blob = new Blob([this.base64Only], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.fileName ?? 'image'}.base64.txt`;
    a.click();

    URL.revokeObjectURL(url);
  }

  clear() {
    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }
    this.resetOutput();
  }

  private resetOutput() {
    this.error = null;
    this.fileName = null;
    this.dataUrl = null;
    this.base64Only = null;
    this.isLoading = false;
    this.activeTab = 'base64';
  }
}
