import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';
import { User, UserCheckTokenResponse } from '../../types/userTypes';
import { environment } from '../../../environments/environment';

/**
 * Injectable to authenticate user and get user data
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
      const loginResponse: User = await firstValueFrom(
        this.http.post<User>(
          `${environment.API_URL}/user/login`,
          { email, password },
          {
            withCredentials: true,
          }
        )
      );

      if (loginResponse && loginResponse.token) {
        localStorage.setItem('currentUser', JSON.stringify(loginResponse));
        this.currentUserSubject.next(loginResponse);
      }

      return loginResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function to register an user
   *
   * @param username Username of the user
   * @param email Email of the user
   * @param password Password of the user
   * @returns
   */
  public async register(
    username: string,
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const registerResponse: User = await firstValueFrom(
        this.http.post<User>(
          `${environment.API_URL}/user/register`,
          { username, email, password },
          {
            withCredentials: true,
          }
        )
      );

      return registerResponse;
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
        this.http.get<UserCheckTokenResponse>(
          `${environment.API_URL}/user/checkToken`,
          {
            withCredentials: true,
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
  public async logout(): Promise<void> {
    try {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next({});

      await firstValueFrom(
        this.http.get<void>(`${environment.API_URL}/user/logout`, {
          withCredentials: true,
        })
      );

      this.router.navigate(['/login']);
    } catch (error) {
      throw error;
    }
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
