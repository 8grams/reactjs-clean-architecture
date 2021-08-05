import { User } from "../../entities/User";

export interface UserRepositoryInterface {
  getAllusers(): Promise<User[]>;
  getUserById(userId: number): Promise<User>;
}
