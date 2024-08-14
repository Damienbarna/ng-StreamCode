import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const zoomAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', 
            style({ position: 'fixed', width: '100%' }), 
            { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'scale(0.5)', opacity: 0 }),
          animate('1s ease-in-out', 
            style({ transform: 'scale(1)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'scale(1)', opacity: 1 }),
          animate('1s ease-in-out', 
            style({ transform: 'scale(0.5)', opacity: 0 }))
          ], { optional: true }),
      ])
    ])
  ]);