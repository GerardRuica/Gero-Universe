import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  Provider,
} from '@angular/core';
import { SelectOption } from '../../../../types/componentsTypes';
import { TranslateModule } from '@ngx-translate/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** Provider to do form select */
const CUSTOM_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormSelectComponent),
  multi: true,
};

@Component({
  selector: 'basic-select',
  imports: [TranslateModule],
  templateUrl: './form-select.component.html',
  styleUrl: './form-select.component.scss',
  providers: [CUSTOM_CONTROL_VALUE_ACCESSOR],
})
export class FormSelectComponent implements ControlValueAccessor {
  /** Label text of the input */
  @Input() public labelText: string = '';
  /** List with value and labels of the select  */
  @Input() public options: SelectOption[] = [];
  /** Actual selected value */
  @Input() public selectedValue: string | null = null;
  /** Indicates if input is required or not */
  @Input() public required: boolean = false;

  /** Value changes */
  @Output() public valueChange = new EventEmitter<string>();

  private onChange = (value: any) => {};
  private onTouched = () => {};

  /** Emits an event when value of the select change */
  public onValueChange(event: Event): void {
    const target: HTMLSelectElement = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
    this.onChange(this.selectedValue);
    this.valueChange.emit(this.selectedValue);
  }

  /** Set a value on the component */
  public writeValue(value: any): void {
    this.selectedValue = value;
  }

  /** Registers a change function that Angular will use when the user selects a value in the <select> */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /** Registers a function that Angular calls when the field is tapped */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** This method allows Angular to disable the <select> when the form requires it */
  public setDisabledState?(isDisabled: boolean): void {}
}
