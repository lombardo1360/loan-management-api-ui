export interface CreateLoanRequest {
  clientId: number;
  amount: number;
  interestRate: number;
  termInMonths: number;
}
