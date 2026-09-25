import { UserRole } from './user';

export interface UpdateUserRequest {
  username: string;
  password: string;
  role: UserRole;
}
