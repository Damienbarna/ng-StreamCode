import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';  
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './pages/login/login.component';

import { AuthService } from './services/auth.service';

import { zoomAnimation } from './route-animation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidenavComponent, MatMenuModule, LoginComponent, ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [zoomAnimation]
})
export class AppComponent {

  constructor(private authService: AuthService) {
    this.isAuth = this.authService.isLoggedIn();
  }
  showFiller = false;

  isModalVisible: boolean = false;
  isAuth: boolean = false;


  

  closeModal(): void {
    this.isModalVisible = false;
  }
  onSignup(): void {
    this.isModalVisible = false;
  }

  logout(): void {
    this.authService.logout();
   this.isAuth = false;
    
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}