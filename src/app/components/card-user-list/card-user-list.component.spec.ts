import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserListComponent } from './card-user-list.component';

describe('CardUserListComponent', () => {
  let component: CardUserListComponent;
  let fixture: ComponentFixture<CardUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
