import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  
  
  
  isSecondModalVisible = false;
  signupForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});
  userName: string = "";

  isAuthenticated = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  openFirstModal() {
    this.isVisible = true;
    this.isSecondModalVisible = false;
  }

  openSecondModal() {
    this.isSecondModalVisible = true;
    this.isVisible = false;
  }

  onClose(event: Event): void {
    this.isVisible = false;
    this.close.emit();
  }

  onCloseSecondModal(event: Event) {
    this.isSecondModalVisible = false;
  }

  preventClose(event: Event): void {
    event.stopPropagation();
  }

  onRegisterSubmit() {
    const { username, password } = this.signupForm.value;
    this.authService.register(username, password).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.onClose(new Event('close'));
      },
      error: (error) => {
        console.error('Erreur lors de l\'inscription', error);
      }
    });
  }

  onLoginSubmit() {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);
        console.log(username, password);
        this.userName = username;

        this.isAuthenticated = true;
        this.onClose(new Event('close'));
        
      },
      error: (error) => {     
        console.error('Erreur lors de la connexion', error);
      }
    })
  }
}