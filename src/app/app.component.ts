import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';  
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidenavComponent, MatMenuModule, LoginComponent, FooterComponent,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
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

  
}