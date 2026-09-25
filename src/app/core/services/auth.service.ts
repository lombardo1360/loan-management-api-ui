import { Injectable, Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../models/auth/login-request';
import { LoginResponse } from '../models/auth/login-response';

@Service()
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/auth';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request,
      {
        responseType: 'text' as 'json'
      }
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getRole(): string | null {

    const token = this.getToken();

    if (!token) {
      return null;
    }

    const payload = token.split('.')[1];

    const decodedPayload = JSON.parse(
      atob(payload)
    );

    return decodedPayload.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }
}
