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
  {path : 'home', component : HomeComponent},
  {path : '', component : HomeComponent},
  {path : 'categories', component : CategoriesComponent},
  {path : 'jeux', component : JeuxVideoComponent},
  {path : 'web', component : WebComponent},
  {path : 'logiciel', component : LogicielComponent},
  {path : 'smartphone', component : SmartphoneComponent},
  {path : 'securite', component : SecuriteComponent},
  {path : 'live', component : LiveComponent},
  {path : 'vod', component : VodComponent},
  {path : 'login', component : LoginComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  
];
