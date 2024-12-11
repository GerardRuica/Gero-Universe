import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss',
})
export class AppCardComponent {
  @Input() imageSrc: string = '';
  @Input() backgroundColor: string = '';
}
