import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuxVideoComponent } from './jeux-video.component';

describe('JeuxVideoComponent', () => {
  let component: JeuxVideoComponent;
  let fixture: ComponentFixture<JeuxVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JeuxVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeuxVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
