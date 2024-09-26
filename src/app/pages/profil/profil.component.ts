import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service'; 

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class ProfilComponent implements OnInit {

  selectedFile: File | null = null;

  @Output() photoUploaded = new EventEmitter<any>();
  

  constructor(
    private uploadService: UploadService, 
    private authService: AuthService,
    private userService: UserService
  ) {}  

  userGroup = new FormGroup({
    image: new FormControl<string | null>(null),
    userId: new FormControl<string | null>(null),
    imageUrl: new FormControl<string | null>(null),
  });

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.userService.getUserProfile(userId).subscribe({
        next: (user) => {
          this.userGroup.patchValue({
            imageUrl: user.imageUrl,
            
          });
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du profil utilisateur', error);
        }
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const userId = this.authService.getCurrentUserId();
      if (!userId) {
        console.error('User ID est nul. Veuillez vérifier le service d\'authentification.');
        return;
      }

      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('userId', userId);

      this.uploadService.uploadProfilePicture(formData).subscribe({
        next: (response) => {
          console.log('Photo uploadée avec succès', response);
          this.photoUploaded.emit(response);
          // Mettre à jour imageUrl sans réinitialiser le formulaire
          this.userGroup.patchValue({ imageUrl: response.imageUrl });
        },
        error: (error) => {
          console.error('Erreur lors du téléchargement de la photo', error);
        }
      });
    } else {
      console.error('Aucun fichier sélectionné');
    }
  }
}