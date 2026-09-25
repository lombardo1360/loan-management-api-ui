import { Injectable, Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user/user';
import { CreateUserRequest } from '../models/user/create-user-request';
import { UpdateUserRequest } from '../models/user/update-user-request';

@Service()
export class UserService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/users';

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(
      this.apiUrl
    );
  }

  getUserById(id: number): Observable<User> {

    return this.http.get<User>(
      `${this.apiUrl}/${id}`
    );
  }

  createUser(
    request: CreateUserRequest
  ): Observable<User> {

    return this.http.post<User>(
      this.apiUrl,
      request
    );
  }

  updateUser(
    id: number,
    request: UpdateUserRequest
  ): Observable<User> {

    return this.http.put<User>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  deleteUser(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
