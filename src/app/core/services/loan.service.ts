import { Injectable, Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Loan } from '../models/loan/loan';
import { CreateLoanRequest } from '../models/loan/create-loan-request';
import { UpdateLoanRequest } from '../models/loan/update-loan-request';

@Service()
export class LoanService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/loans';

  getLoans(): Observable<Loan[]> {

    return this.http.get<Loan[]>(
      this.apiUrl
    );
  }

  getLoanById(id: number): Observable<Loan> {

    return this.http.get<Loan>(
      `${this.apiUrl}/${id}`
    );
  }

  createLoan(
    request: CreateLoanRequest
  ): Observable<Loan> {

    return this.http.post<Loan>(
      this.apiUrl,
      request
    );
  }

  updateLoan(
    id: number,
    request: UpdateLoanRequest
  ): Observable<Loan> {

    return this.http.put<Loan>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  approveLoan(id: number): Observable<Loan> {

    return this.http.put<Loan>(
      `${this.apiUrl}/${id}/approve`,
      {}
    );
  }

  rejectLoan(id: number): Observable<Loan> {

    return this.http.put<Loan>(
      `${this.apiUrl}/${id}/reject`,
      {}
    );
  }

  deleteLoan(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
