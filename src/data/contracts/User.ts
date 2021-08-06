import { User } from "../../entities/User";

export interface UserRepositoryInterface {
  getAllUsers(): Promise<User[]>;
  getUserById(userId: number): Promise<User>;
}
