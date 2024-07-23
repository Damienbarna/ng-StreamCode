import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWebComponent } from './list-web.component';

describe('ListWebComponent', () => {
  let component: ListWebComponent;
  let fixture: ComponentFixture<ListWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
