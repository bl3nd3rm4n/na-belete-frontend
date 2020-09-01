import {Role} from './role';

export class User {
  id?: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  address?: string;
  role?: Role;
  enabled?: boolean;
  failCountdown?: number;
}
