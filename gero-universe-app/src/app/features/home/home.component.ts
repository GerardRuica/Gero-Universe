import { Component } from '@angular/core';
import { AppCardComponent } from '../../shared/cards/app-card/app-card.component';

@Component({
  selector: 'app-home',
  imports: [AppCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
