import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'basic-button',
  imports: [CommonModule],
  templateUrl: './basic-button.component.html',
  styleUrl: './basic-button.component.scss',
})
export class BasicButtonComponent {
  @Input() public text: string = '';
  @Input() public type: string = 'submit';
  @Input() public color: string = 'white';
}
