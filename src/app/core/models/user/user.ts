export type UserRole =
  | 'ROLE_USER'
  | 'ROLE_ADMIN';

export interface User {
  id: number;
  username: string;
  role: UserRole;
}
