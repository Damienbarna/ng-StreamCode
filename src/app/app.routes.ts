import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { JeuxVideoComponent } from './pages/jeux-video/jeux-video.component';
import { WebComponent } from './pages/web/web.component';
import { LogicielComponent } from './pages/logiciel/logiciel.component';
import { SmartphoneComponent } from './pages/smartphone/smartphone.component';
import { SecuriteComponent } from './pages/securite/securite.component';
import { LiveComponent } from './pages/live/live.component';
import { VodComponent } from './pages/vod/vod.component';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
  {path : 'home', component : HomeComponent, data: { animation: 'HomePage' }},
  {path : '', component : HomeComponent, data: { animation: 'HomePage' }},
  {path : 'categories', component : CategoriesComponent, data: { animation: 'CategoriesPage' }},
  {path : 'jeux', component : JeuxVideoComponent, data: { animation: 'JeuxPage' }},
  {path : 'web', component : WebComponent, data: { animation: 'WebPage' }},
  {path : 'logiciel', component : LogicielComponent, data: { animation: 'LogicielPage' }},
  {path : 'smartphone', component : SmartphoneComponent, data: { animation: 'SmartphonePage' }},
  {path : 'securite', component : SecuriteComponent, data: { animation: 'SecuritePage' }},
  {path : 'live', component : LiveComponent, data: { animation: 'LivePage' }},
  {path : 'vod', component : VodComponent, data: { animation: 'VodPage' }},
  {path : 'login', component : LoginComponent, data: { animation: 'LoginPage' }},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  
];