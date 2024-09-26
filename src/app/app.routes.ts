import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { JeuxVideoComponent } from './pages/jeux-video/jeux-video.component';
import { WebComponent } from './pages/web/web.component';
import { LogicielComponent } from './pages/logiciel/logiciel.component';
import { SmartphoneComponent } from './pages/smartphone/smartphone.component';
import { SecuriteComponent } from './pages/securite/securite.component';
import { VodComponent } from './pages/vod/vod.component';
import { LoginComponent } from './pages/login/login.component';
import { VideoUserComponent } from './pages/video-user/video-user.component';
import { LocalStreamComponent } from './pages/local-stream/local-stream.component';
import { LiveComponent } from './pages/live/live.component';
import { VideoDetailComponent } from './pages/video-detail/video-detail.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ChatComponent } from './components/chat/chat.component';





export const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : '', component : HomeComponent},
  {path : 'categories', component : CategoriesComponent},
  {path : 'jeux', component : JeuxVideoComponent},
  {path : 'web', component : WebComponent},
  {path : 'logiciel', component : LogicielComponent},
  {path : 'smartphone', component : SmartphoneComponent},
  {path : 'securite', component : SecuriteComponent},
  {path : 'vod', component : VodComponent},
  {path : 'login', component : LoginComponent},
  {path : 'videoUser', component : VideoUserComponent},
  {path : 'local-stream', component : LocalStreamComponent},
  {path : 'live', component : LiveComponent},
  {path : 'video/:id', component : VideoDetailComponent},
  {path : 'profil', component : ProfilComponent},
  {path : 'chat', component : ChatComponent},
  {path : 'live/:id', component : LiveComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  
];