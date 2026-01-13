import { Component, signal } from '@angular/core';
import {Footer} from './component/footer/footer';
import {Header} from './component/header/header';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Footer, Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('jpgtobase64');
}
