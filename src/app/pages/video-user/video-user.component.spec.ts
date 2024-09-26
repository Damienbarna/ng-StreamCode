import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUserComponent } from './video-user.component';

describe('VideoUserComponent', () => {
  let component: VideoUserComponent;
  let fixture: ComponentFixture<VideoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
