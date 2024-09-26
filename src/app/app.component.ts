import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';  
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './pages/login/login.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

import { fader } from './route-animation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidenavComponent, MatMenuModule, LoginComponent, ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader]
})
export class AppComponent implements OnInit {
  userProfile: any = null;
  profileImageUrl: string | null = null;

  

  constructor(private userService: UserService, private authService: AuthService) {
    this.isAuth = this.authService.isLoggedIn();
  }
  showFiller = false;

  isModalVisible: boolean = false;
  isAuth: boolean = false;

  ngOnInit() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.userService.getUserProfile(userId).subscribe({
        next: (user) => {
          this.profileImageUrl = user.imageUrl;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du profil utilisateur', error);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
  onSignup(): void {
    this.isModalVisible = false;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}