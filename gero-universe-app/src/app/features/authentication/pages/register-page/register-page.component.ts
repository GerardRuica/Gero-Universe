import { Component } from '@angular/core';
import { FormInputComponent } from '../../../../shared/inputs/form-input/form-input.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BasicButtonComponent } from '../../../../shared/basic/buttons/basic-button/basic-button.component';
import { AuthService } from '../../../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { User, UserRegister } from '../../../../types/userTypes';

@Component({
  selector: 'register-page',
  imports: [
    FormInputComponent,
    ReactiveFormsModule,
    FormsModule,
    BasicButtonComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  /** Register form */
  public registerForm: FormGroup;

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
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      repeatEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
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
    } catch (error) {
      throw error;
    }
  }
}
