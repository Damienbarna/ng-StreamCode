import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModelProducts } from '../../utils/model-products';
import { UpdateCardUserComponent } from '../update-card-user/update-card-user.component';


@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [UpdateCardUserComponent],
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent {


  products: ModelProducts[] = [];
 

  @Input({required:true}) product!: ModelProducts;
  @Output() productDeleted = new EventEmitter<number>();
  @Output() productUpdated = new EventEmitter<number>();
  
  
  

  deleteProduct() {
    this.productDeleted.emit(this.product.id);
  }

  onProductUpdated(updatedProduct: ModelProducts) {
    this.product = updatedProduct;
    this.productUpdated.emit(updatedProduct.id); 
  }

  playPause(video: HTMLVideoElement) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  stop(video: HTMLVideoElement) {
    video.pause();
    video.currentTime = 0;
  }

  seek(video: HTMLVideoElement, event: Event) {
    const input = event.target as HTMLInputElement;
    video.currentTime = parseFloat(input.value);
  }

  muteUnmute(video: HTMLVideoElement) {
    video.muted = !video.muted;
  }

  updateProgress(video: HTMLVideoElement) {
    const progressBar = document.querySelector('input[type="range"]') as HTMLInputElement;
    if (progressBar) {
      progressBar.value = video.currentTime.toString();
    }
  }

  changeVolume(video: HTMLVideoElement, event: Event) {
    const input = event.target as HTMLInputElement;
    video.volume = parseFloat(input.value);
  }
}