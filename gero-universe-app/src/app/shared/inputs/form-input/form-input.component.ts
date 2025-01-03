import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-input',
  imports: [],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent {
  @Input() public labelText: string = '';
  @Input() public placeholderText: string = '';
  @Input() public type: string = 'text';
}
