import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLogicielComponent } from './list-logiciel.component';

describe('ListLogicielComponent', () => {
  let component: ListLogicielComponent;
  let fixture: ComponentFixture<ListLogicielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLogicielComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLogicielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
