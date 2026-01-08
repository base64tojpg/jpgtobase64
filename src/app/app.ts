import { Component, signal } from '@angular/core';
import {JpgToBase64Component} from './jpg-to-base64/jpg-to-base64';

@Component({
  selector: 'app-root',
  imports: [JpgToBase64Component],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('jpgtobase64');

  fullYear = new Date().getFullYear();
}
