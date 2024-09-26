import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StreamingService } from '../../services/streaming.service';

@Component({
  selector: 'app-active-streams',
  templateUrl: './active-streams.component.html',
  styleUrls: ['./active-streams.component.scss'],
  standalone: true,
})
export class ActiveStreamsComponent implements OnInit {
  activeStreams: string[] = [];

  constructor(private streamingService: StreamingService, private router: Router) {}

  ngOnInit(): void {
    this.streamingService.getActiveStreams().subscribe(streams => {
      this.activeStreams = streams;
    });
  }

  joinStream(streamId: string): void {
    this.router.navigate(['/live', streamId]);
  }
}