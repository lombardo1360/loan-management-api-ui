import { LoanStatus } from './loan-status';

export interface Loan {
  id: number;
  amount: number;
  interestRate: number;
  termInMonths: number;
  status: LoanStatus;
  createdAt: string;
  clientId: number;
}
