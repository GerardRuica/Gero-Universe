import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component that implements buttons of the menu-button
 */
@Component({
  selector: 'menu-sub-button',
  imports: [],
  templateUrl: './menu-sub-button.component.html',
  styleUrl: './menu-sub-button.component.scss',
})
export class MenuSubButtonComponent {
  /** Text of the button */
  @Input() public text?: string = '';
  /** Type of the button */
  @Input() public type: string = 'submit';
  /** Event to notify that button is clicked */
  @Output() action = new EventEmitter<void>();

  /** Emits click event */
  public handleClick(): void {
    this.action.emit();
  }
}
