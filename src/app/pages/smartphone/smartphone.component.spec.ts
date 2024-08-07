import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartphoneComponent } from './smartphone.component';

describe('SmartphoneComponent', () => {
  let component: SmartphoneComponent;
  let fixture: ComponentFixture<SmartphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartphoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
