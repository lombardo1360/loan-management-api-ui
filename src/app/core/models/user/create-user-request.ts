import { UserRole } from './user';

export interface CreateUserRequest {
  username: string;
  password: string;
  role: UserRole;
}
