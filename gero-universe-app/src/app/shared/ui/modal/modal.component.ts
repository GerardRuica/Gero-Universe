import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title?: string = 'Modal title';
  @Input() open: boolean = false;
  @Input() width?: string = '200px';

  @Output() closeEvent = new EventEmitter<string>();
  @Output() submitEvent = new EventEmitter<string>();

  public ngOnInit(): void {
    console.log('Modal init');
  }

  public close() {
    this.closeEvent.emit('close');
  }

  public submit() {
    this.submitEvent.emit('submit');
  }
}
