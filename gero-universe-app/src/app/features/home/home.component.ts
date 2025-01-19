import { Component } from '@angular/core';
import { AppCardComponent } from '../../shared/cards/app-card/app-card.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [AppCardComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
