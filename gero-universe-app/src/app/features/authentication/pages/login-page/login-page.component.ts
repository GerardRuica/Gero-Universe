import { Component } from '@angular/core';
import { FormInputComponent } from '../../../../shared/inputs/form-input/form-input.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../services/auth-service/auth.service';
import { UserLogin } from '../../../../types/userTypes';
import { BasicButtonComponent } from '../../../../shared/basic/buttons/basic-button/basic-button.component';

/**
 * Page to login an user
 */
@Component({
  selector: 'login-page',
  imports: [
    FormInputComponent,
    ReactiveFormsModule,
    FormsModule,
    BasicButtonComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  /** Login form */
  public loginForm: FormGroup;

  /**
   * Constructor that import all dependencies and initializes form
   *
   * @param {FormBuilder} formBuilder Form builder to creates form
   * @param {AuthService} authService Auth service to login
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * Function thad do actions of teh submit button
   */
  public onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password }: UserLogin = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Successful login', response);
        },
        error: (error) => {
          console.error('Error when login ', error);
        },
      });
    }
  }
}
