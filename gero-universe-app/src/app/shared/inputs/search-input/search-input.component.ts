import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  @Input() placeholder: string = '';
}
