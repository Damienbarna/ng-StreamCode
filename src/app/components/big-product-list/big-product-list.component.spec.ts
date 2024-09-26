import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigProductListComponent } from './big-product-list.component';

describe('BigProductListComponent', () => {
  let component: BigProductListComponent;
  let fixture: ComponentFixture<BigProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
