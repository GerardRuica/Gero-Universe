import { Component, forwardRef, Input, Provider } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

/** Provider to do form input */
export const CUSTOM_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormInputComponent),
  multi: true,
};

/**
 * This component creates a customizable input field that can be used with reactive forms.
 * It implements `ControlValueAccessor` to integrate with Angular's form API,
 * allowing it to be used with `formControlName` in a reactive form.
 */
@Component({
  selector: 'form-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
  providers: [CUSTOM_CONTROL_VALUE_ACCESSOR],
})
export class FormInputComponent implements ControlValueAccessor {
  /** Label text of the input */
  @Input() public labelText: string = '';
  /** Placeholder text of the input */
  @Input() public placeholderText: string = '';
  /** Input type */
  @Input() public type: string = 'text';

  /** Internal value bound to the input field. */
  public value: string = '';

  /** Callback for handling changes in the input value */
  public onChange = (value: string) => {};

  /** Callback for handling touch events */
  public onTouched = () => {};

  public onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
  }

  /**
   * Writes a new value to the input field
   * @param value The value to write to the input
   */
  public writeValue(value: string): void {
    this.value = value ?? '';
  }

  /**
   * Registers a function to call when the value changes
   * @param fn The function to call on value change
   */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a function to call when the input is touched
   * @param fn The function to call on touch
   */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the input field
   * @param {boolean} isDisabled Whether the input should be disabled
   */
  public setDisabledState?(isDisabled: boolean): void {}
}
