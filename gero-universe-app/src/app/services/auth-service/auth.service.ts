import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';
import { User, UserCheckTokenResponse } from '../../types/userTypes';

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
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser: string | null = localStorage.getItem('currentUser');
      this.currentUserSubject = new BehaviorSubject<User>(
        storedUser ? JSON.parse(storedUser) : null
      );
    } else {
      this.currentUserSubject = new BehaviorSubject<User>({});
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Function to login an user
   *
   * @param {string} email User email
   * @param {string} password User password
   * @returns User data from backend
   */
  public async login(email: string, password: string): Promise<User | null> {
    try {
      const response: User = await firstValueFrom(
        this.http.post<User>(
          `${this.apiUrl}/user/login`,
          { email, password },
          {
            withCredentials: true,
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
          }
        )
      );

      if (response && response.token) {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function to check if user token is valid or not
   *
   * @returns Boolean indicating if token is valid or not
   */
  public async checkToken(): Promise<boolean> {
    try {
      const response: UserCheckTokenResponse = await firstValueFrom(
        this.http.post<UserCheckTokenResponse>(
          `${this.apiUrl}/user/checkToken`,
          {
            token: this.getCurrentUserValue().token,
          },
          {
            withCredentials: true,
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
          }
        )
      );

      return response.valid;
    } catch (error) {
      throw error;
    }
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
  public getCurrentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Function to verifies if user is authenticated or not
   *
   * @returns Boolean indicating if user is authenticated and has a valid token
   */
  public async isAuthenticated(): Promise<boolean> {
    try {
      const userData: User = this.getCurrentUserValue();
      let validToken: boolean = false;
      if (userData.token) {
        validToken = await this.checkToken();
      }

      return validToken;
    } catch (error) {
      throw error;
    }
  }
}
