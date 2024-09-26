import { Component, OnInit } from '@angular/core';
import { RemoteStreamComponent } from '../../components/remote-stream/remote-stream.component';




@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
  imports: [ RemoteStreamComponent],
  standalone: true,
})
export class LiveComponent   {


}