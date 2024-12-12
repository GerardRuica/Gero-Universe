import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss',
})
export class AppCardComponent {
  @Input() imageSrc: string = '';
  @Input() backgroundColor: string = '';
}
