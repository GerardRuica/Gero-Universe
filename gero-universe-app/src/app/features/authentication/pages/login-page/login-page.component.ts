import { Component } from '@angular/core';
import { FormInputComponent } from '../../../../shared/inputs/form-input/form-input.component';

@Component({
  selector: 'login-page',
  imports: [FormInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
