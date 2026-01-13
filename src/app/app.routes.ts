import { Routes } from '@angular/router';
import {Home} from './page/home/home';
import {About} from './page/about/about';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'about', component: About},
  // {path: '**', component: NotFound},
];
