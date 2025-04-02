import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOption } from '../../../../types/componentsTypes';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'basic-select',
  imports: [TranslateModule],
  templateUrl: './basic-select.component.html',
  styleUrl: './basic-select.component.scss',
})
export class BasicSelectComponent {
  /** Label text of the input */
  @Input() public labelText: string = '';
  /** List with value and labels of the select  */
  @Input() public options: SelectOption[] = [];
  /** Actual selected value */
  @Input() public selectedValue: string = '';
  /** Indicates if input is required or not */
  @Input() public required: boolean = false;

  /** Value changes */
  @Output() public valueChange = new EventEmitter<string>();

  /** Emits an event when value of the select change */
  public onValueChange(event: Event): void {
    const newValue = (event.target as HTMLSelectElement).value;
    this.valueChange.emit(newValue);
  }
}
