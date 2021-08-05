import { UserRepositoryInterface } from "../../../data/contracts/User";
import { UserDataMapper } from "../../../data/mappers/User";
import { Endpoints } from "../../misc/Endpoints";
import ApiService from "../../services/ApiService";
import { User } from "../../../entities/User";

export class UserApiRepository implements UserRepositoryInterface {
  private apiService: ApiService;
  private mapper: UserDataMapper;
  private endpoints: Endpoints;

  constructor(
    apiService: ApiService,
    mapper: UserDataMapper,
    endpoints: Endpoints
  ) {
    this.apiService = apiService;
    this.mapper = mapper;
    this.endpoints = endpoints;
  }

  public async getAllusers(): Promise<User[]> {
    const dataResponse = await this.apiService.invoke(
      "get",
      this.endpoints.users()
    );
    return this.mapper.convertUserDataFromApi(dataResponse);
  }

  public async getUserById(userId: number): Promise<User> {
    const dataResponse = await this.apiService.invoke(
      "get",
      this.endpoints.users() + "/" + userId
    );
    return this.mapper.convertUserByIdFromApi(dataResponse);
  }
}
