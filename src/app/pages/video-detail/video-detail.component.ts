import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ModelProducts } from '../../utils/model-products';
import { from } from 'rxjs';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [],
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  videoId: number | null = null;
  videoDetails: ModelProducts | null = null;
  videoUrl: string | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.videoId = +id;
        console.log('Video ID:', this.videoId);
        this.loadVideoDetails();
      } else {
        console.error('No video ID found in route parameters');
      }
    });
  }

  loadVideoDetails(): void {
    if (this.videoId !== null) {
      from(this.productService.getProductById(this.videoId)).subscribe({
        next: (videos) => {
          console.log('Video Object:', videos);
          if (Array.isArray(videos)) {
            const video = videos.find(v => v.id === this.videoId);
            if (video) {
              this.videoDetails = video;
              console.log('Video Details:', this.videoDetails);
              if (this.videoDetails?.image) {
                this.videoUrl = encodeURI(this.videoDetails.image);
                console.log('Encoded Video URL:', this.videoUrl);
              } else {
                console.error('Image URL is missing in video details');
              }
            } else {
              console.error('No video found with the specified ID');
            }
          } else {
            console.error('Expected an array of videos');
          }
        },
        error: (err) => console.error('Erreur lors de la récupération des détails de la vidéo', err)
      });
    } else {
      console.error('Video ID is null');
    }
  }

  likeVideo(): void {
    if (this.videoId !== null) {
      this.productService.likeProduct(this.videoId).subscribe({
        next: (updatedProduct: ModelProducts) => {
          if (this.videoDetails) {
            this.videoDetails.likes = updatedProduct.likes;
          }
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du like', error);
        }
      });
    } else {
      console.error('Video ID is null');
    }
  }
}
