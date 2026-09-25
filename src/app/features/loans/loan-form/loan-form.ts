import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoanService } from '../../../core/services/loan.service';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './loan-form.html',
  styleUrl: './loan-form.css'
})
export class LoanForm {

   private readonly fb = inject(FormBuilder);
  private readonly loanService = inject(LoanService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  loanId: number | null = null;

  loanForm = this.fb.nonNullable.group({
    clientId: [0, [
      Validators.required,
      Validators.min(1)
    ]],

    amount: [0, [
      Validators.required,
      Validators.min(0.01)
    ]],

    interestRate: [0, [
      Validators.required,
      Validators.min(0)
    ]],

    termInMonths: [0, [
      Validators.required,
      Validators.min(1)
    ]]
  });

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loanId = Number(id);
      this.loadLoan(this.loanId);
    }
  }

  loadLoan(id: number): void {

    this.loanService.getLoanById(id).subscribe({

      next: loan => {

        this.loanForm.patchValue({
          clientId: loan.clientId,
          amount: loan.amount,
          interestRate: loan.interestRate,
          termInMonths: loan.termInMonths
        });

      },

      error: error => {
        console.error('Error loading loan:', error);
      }

    });
  }

  saveLoan(): void {

    if (this.loanForm.invalid) {
      this.loanForm.markAllAsTouched();
      return;
    }

    const request = this.loanForm.getRawValue();

    if (this.loanId) {

      this.loanService.updateLoan(
        this.loanId,
        request
      ).subscribe({

        next: () => {
          this.router.navigate(['/loans']);
        },

        error: error => {
          console.error('Error updating loan:', error);
        }

      });

      return;
    }

    this.loanService.createLoan(request).subscribe({

      next: () => {
        this.router.navigate(['/loans']);
      },

      error: error => {
        console.error('Error creating loan:', error);
      }

    });
  }
}
