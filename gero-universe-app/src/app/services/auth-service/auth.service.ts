import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../types/userTypes';

/**
 * Injectable to authenticate user and get user data
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Url of the backend */
  private apiUrl: string = 'http://localhost:3000';
  /** Current user subject */
  private currentUserSubject: BehaviorSubject<User>;
  /** Current user with user info */
  public currentUser: Observable<User>;

  /**
   * Constructor that initializes services vars
   *
   * @param {HttpClient} http Http client to do http petitions
   * @param {Router} router Router to redirect
   */
  constructor(private http: HttpClient, private router: Router) {
    const storedUser: string | null = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Function to login an user
   *
   * @param {string} email User email
   * @param {string} password User password
   * @returns USer data
   */
  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/user/login`, { email, password })
      .pipe(
        tap((user: User) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        })
      );
  }

  /**
   * Function to log out user (removes current user token from localStorage)
   */
  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({});
    this.router.navigate(['/login']);
  }

  /**
   * Function to get user data
   *
   * @returns User data
   */
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Function yo verifies if user is authenticated or not
   *
   * @returns Boolean indicating if user is authenticated
   */
  public isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
