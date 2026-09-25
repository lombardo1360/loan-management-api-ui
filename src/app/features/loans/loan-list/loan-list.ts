import { Component, inject, OnInit } from '@angular/core';
import { LoanService } from '../../../core/services/loan.service';
import { Loan } from '../../../core/models/loan/loan';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loan-list',
  imports: [RouterLink],
  templateUrl: './loan-list.html',
  styleUrl: './loan-list.css',
})
export class LoanList implements OnInit {

  private readonly loanService = inject(LoanService);

  loans: Loan[] = [];

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getLoans().subscribe({
      next: loans => {
        this.loans = loans;
      },
      error: error => {
        console.error('Error loading loans', error);
      }
    });
  }

  approve(id: number): void {
    this.loanService.approveLoan(id).subscribe({
      next: () => {
        this.loadLoans();
      },
      error: error => {
        console.error('Error approving loan', error);
      }
    });
  }

  reject(id: number): void {
    this.loanService.rejectLoan(id).subscribe({
      next: () => {
        this.loadLoans();
      },
      error: error => {
        console.error('Error rejecting loan', error);
      }
    });
  }

  delete(id: number): void {

  if (!confirm('¿Está seguro de eliminar este préstamo?')) {
    return;
  }

  this.loanService.deleteLoan(id).subscribe({

    next: () => {
      this.loadLoans();
    },

    error: error => {
      console.error('Error deleting loan:', error);
    }

  });
}
}
