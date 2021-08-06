import { injectable } from "tsyringe";
import { UserApiRepository } from "../../app/repository/api/UserApiRepository";
import { User } from "../../entities/User";

@injectable()
export class UserPresenter {
  private repository: UserApiRepository;
  constructor(repository: UserApiRepository) {
    this.repository = repository;
  }

  public getAllUsersPresenter(): Promise<User[]> {
    return this.repository.getAllUsers();
  }

  public getUserByIdPresenter(userId: number): Promise<User> {
    return this.repository.getUserById(userId);
  }
}
