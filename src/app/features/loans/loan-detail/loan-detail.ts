import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Loan } from '../../../core/models/loan/loan';
import { LoanService } from '../../../core/services/loan.service';

@Component({
  selector: 'app-loan-detail',
  imports: [RouterLink],
  templateUrl: './loan-detail.html',
  styleUrl: './loan-detail.css',
})
export class LoanDetail implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly loanService = inject(LoanService);

  loan: Loan | null = null;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadLoan(id);
  }

  loadLoan(id: number): void {

    this.loanService.getLoanById(id).subscribe({

      next: loan => {
        this.loan = loan;
      },

      error: error => {
        console.error('Error loading loan:', error);
      }

    });
  }
}
