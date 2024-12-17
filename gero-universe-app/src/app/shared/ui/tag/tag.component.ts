import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tag',
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  @Input() value: string = '';
  @Input() backgroundColor: string = '#F6D6A2';
  @Input() textColor: string = '#3e312d';
}
