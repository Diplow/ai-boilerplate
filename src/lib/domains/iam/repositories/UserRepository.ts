import type { User } from "../objects";

export interface UserRepository {
  getCurrentUser(): Promise<User | null>;
}
