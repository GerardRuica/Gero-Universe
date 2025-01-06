import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-error',
  imports: [],
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss',
})
export class InputErrorComponent {
  @Input() public errorMsg: string = '';
  @Input() public showError: boolean | undefined = false;
}
