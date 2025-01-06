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
import { User, UserLogin } from '../../../../types/userTypes';
import { BasicButtonComponent } from '../../../../shared/basic/buttons/basic-button/basic-button.component';
import { Router } from '@angular/router';

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
   * @param {Router} router Router to redirect user to home when login
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * Function thad do actions of teh submit button. Login an user
   */
  public async login(): Promise<void> {
    if (this.loginForm.valid) {
      const { email, password }: UserLogin = this.loginForm.value;
      try {
        const user: User | null = await this.authService.login(email, password);
        if (user) {
          this.router.navigate(['']);
        }
      } catch (error) {
        throw error;
      }
    }
  }
}
