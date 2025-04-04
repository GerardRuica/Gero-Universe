import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasicButtonComponent } from '../../basic/buttons/basic-button/basic-button.component';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'basic-dialog',
  standalone: true,
  imports: [BasicButtonComponent, CommonModule],
  templateUrl: './basic-dialog.component.html',
  styleUrl: './basic-dialog.component.scss',
})
export class BasicDialogComponent implements OnInit {
  @Input() public type: string = 'info';
  @Input() public title?: string = 'Dialog title';
  @Input() public description?: string = 'Dialog description';
  @Input() public opened: boolean = false;

  @Output() public closeEvent = new EventEmitter<string>();
  @Output() public submitEvent = new EventEmitter<string>();

  public submitButtonText: string = '';
  public closeButtonText: string = '';
  public dialogIcon: string = 'info';
  public iconColor: string = 'grey';
  public closeButtonColor: string = 'red';
  public submitButtonColor: string = 'green';

  constructor(private translateService: TranslateService) {}

  public ngOnInit(): void {
    this.applyDialogStyles();
  }

  public close(): void {
    this.closeEvent.emit('close');
  }

  public submit(): void {
    this.submitEvent.emit('submit');
  }

  private applyDialogStyles(): void {
    switch (this.type) {
      case 'info':
        this.iconColor = 'grey';
        this.dialogIcon = 'info';
        break;
      case 'delete':
        this.iconColor = '#E24648';
        this.dialogIcon = 'trash';
        this.submitButtonColor = '#E24648';
        this.closeButtonColor = 'grey';
        this.translateService
          .get(['BASIC.delete', 'BASIC.cancel'])
          .subscribe((translations) => {
            this.submitButtonText = translations['BASIC.delete'];
            this.closeButtonText = translations['BASIC.cancel'];
          });
        break;
      default:
        break;
    }
  }
}
