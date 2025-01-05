import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor that import all dependencies
   *
   * @param {AuthService} authService Auth service to verifies if user is authenticated or not
   * @param {Router} router Router service to redirect to app route
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Verifies if user can app to app content
   *
   * @param route
   * @param state
   * @returns Boolean indicating if user can access to content
   */
  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      if (await this.authService.isAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['/user/login']);
        return false;
      }
    } catch (error) {
      this.router.navigate(['/user/login']);
      throw error;
    }
  }
}
