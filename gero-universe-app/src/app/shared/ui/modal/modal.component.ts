import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BasicButtonComponent } from '../../basic/buttons/basic-button/basic-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  imports: [BasicButtonComponent, CommonModule],
})
export class ModalComponent {
  @Input() title?: string = 'Modal title';
  @Input() width?: string = '300px';
  @Input() submitButtonText?: string = '';
  @Input() closeButtonText?: string = '';
  @Input() open: boolean = false;
  @Input() closeModalClickingOverlay: boolean = false;

  @Output() closeEvent = new EventEmitter<string>();
  @Output() submitEvent = new EventEmitter<string>();

  public close() {
    this.closeEvent.emit('close');
  }

  public submit() {
    this.submitEvent.emit('submit');
  }
}
