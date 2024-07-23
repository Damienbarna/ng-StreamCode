import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCardUserComponent } from './update-card-user.component';

describe('UpdateCardUserComponent', () => {
  let component: UpdateCardUserComponent;
  let fixture: ComponentFixture<UpdateCardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCardUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
