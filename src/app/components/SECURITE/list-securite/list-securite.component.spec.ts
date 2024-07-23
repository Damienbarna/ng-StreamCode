import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSecuriteComponent } from './list-securite.component';

describe('ListSecuriteComponent', () => {
  let component: ListSecuriteComponent;
  let fixture: ComponentFixture<ListSecuriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSecuriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSecuriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
