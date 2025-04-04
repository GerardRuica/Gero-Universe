import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BasicButtonComponent } from '../../basic/buttons/basic-button/basic-button.component';
import { CommonModule } from '@angular/common';

/**
 * Component to show a basic modal
 */
@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  imports: [BasicButtonComponent, CommonModule],
})
export class ModalComponent {
  /** Title of the modal */
  @Input() public title?: string = 'Modal title';
  /** Width of the modal */
  @Input() public width?: string = '300px';
  /** Submit button text */
  @Input() public submitButtonText?: string = '';
  /** Close button text */
  @Input() public closeButtonText?: string = '';
  /** Boolean indicating if modal is opened or not */
  @Input() public open: boolean = false;
  /** Boolean indicating if want to close modal clicking overlay or not */
  @Input() public closeModalClickingOverlay: boolean = false;

  /** Event when modal closes */
  @Output() public closeEvent = new EventEmitter<string>();
  /** Event when modal submit */
  @Output() public submitEvent = new EventEmitter<string>();

  /** Function that modal do when close */
  public close() {
    this.closeEvent.emit('close');
  }

  /** Function that modal do when submit */
  public submit() {
    this.submitEvent.emit('submit');
  }
}
