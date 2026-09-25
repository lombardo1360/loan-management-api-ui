import { Injectable, Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Client } from '../models/client/client';
import { CreateClientRequest } from '../models/client/create-client-request';

@Service()
export class ClientService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/clients';

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }


  getClientById(id: number): Observable<Client> {

    return this.http.get<Client>(
      `${this.apiUrl}/${id}`
    );
  }

  createClient(
    request: CreateClientRequest
  ): Observable<Client> {

    return this.http.post<Client>(
      this.apiUrl,
      request
    );
  }
}
