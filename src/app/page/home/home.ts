import { Component } from '@angular/core';
import {JpgToBase64Component} from '../../component/jpg-to-base64/jpg-to-base64';

@Component({
  selector: 'app-home',
  imports: [
    JpgToBase64Component
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
