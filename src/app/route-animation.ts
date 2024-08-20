import { trigger, transition, style, animate } from '@angular/animations';

export const fader = 
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ opacity: 0}),
      animate('1s ease-in-out', style({ opacity: 1 }))
    ])
  ]);