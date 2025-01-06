import { Component } from '@angular/core';
import { FormInputComponent } from '../../../../shared/inputs/form-input/form-input.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BasicButtonComponent } from '../../../../shared/basic/buttons/basic-button/basic-button.component';
import { AuthService } from '../../../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { User, UserRegister } from '../../../../types/userTypes';
import { InputErrorComponent } from '../../../../shared/inputs/input-error/input-error.component';
import { AlertComponent } from '../../../../shared/ui/alert/alert.component';

/**
 * Component that shows a form to create an user
 */
@Component({
  selector: 'register-page',
  imports: [
    FormInputComponent,
    ReactiveFormsModule,
    FormsModule,
    BasicButtonComponent,
    InputErrorComponent,
    AlertComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  /** Register form */
  public registerForm: FormGroup;
  /** Error message */
  public errorMessage: string = '';
  /** Type of the error message */
  public errorMessageType: string = '';

  /**
   * Constructor that import all dependencies and initializes form
   *
   * @param {FormBuilder} formBuilder Form builder to creates form
   * @param {AuthService} authService Auth service to register
   * @param {Router} router Router to redirect user to home when register
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        repeatEmail: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        repeatPassword: ['', Validators.required],
      },
      {
        validators: [
          this.passwordMatchValidator(),
          this.emailMatchValidator(),
          this.emailValidator(),
          this.passwordValidator(),
        ],
      }
    );
  }

  /**
   * Function thad do actions of teh submit button. Register an user
   */
  public async register(): Promise<void> {
    try {
      if (this.registerForm.valid) {
        const { username, email, password }: UserRegister =
          this.registerForm.value;

        const user: User | null = await this.authService.register(
          username,
          email,
          password
        );

        if (user) {
          this.router.navigate(['']);
        }
      }
    } catch (error: any) {
      this.errorMessage = error.error.message;
      this.errorMessageType = 'error';
      throw error;
    }
  }

  /**
   * Validator to verify if password and repeat password as the same or not
   *
   * @returns Validator
   */
  private passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass: string = formGroup.get('password')?.value;
      const confirmPass: string = formGroup.get('repeatPassword')?.value;
      return pass === confirmPass ? null : { passwordMismatch: true };
    };
  }

  /**
   * Validator to verify if email and repeat email as the same or not
   *
   * @returns Validator
   */
  private emailMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const email: string = formGroup.get('email')?.value;
      const confirmEmail: string = formGroup.get('repeatEmail')?.value;
      return email === confirmEmail ? null : { emailMismatch: true };
    };
  }

  /**
   * Validator to verify if email has the correct format
   *
   * @returns Validator
   */
  private emailValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const email: string = formGroup.get('email')?.value;
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) ? null : { emailInvalidFormat: true };
    };
  }

  /**
   * Validator to verify if password has the correct format
   *
   * @returns Validator
   */
  private passwordValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass: string = formGroup.get('password')?.value;
      const passRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passRegex.test(pass) ? null : { passwordInvalidFormat: true };
    };
  }
}
