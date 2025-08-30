import { AuthLevels } from './AuthLevels';
import { User } from './User';

export interface AuthData {
  loggedIn: boolean | undefined;
  accessLevel?: AuthLevels;
  user?: User;
  loading: boolean;
  error?: string;
}
