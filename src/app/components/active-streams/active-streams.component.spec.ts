import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStreamsComponent } from './active-streams.component';

describe('ActiveStreamsComponent', () => {
  let component: ActiveStreamsComponent;
  let fixture: ComponentFixture<ActiveStreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveStreamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
