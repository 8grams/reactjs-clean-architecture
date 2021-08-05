import { PhotoRepositoryInterface } from "../../../data/contracts/Photo";
import { PhotoDataMapper } from "../../../data/mappers/Photo";
import { Endpoints } from "../../misc/Endpoints";
import ApiService from "../../services/ApiService";
import { Photo } from "../../../entities/Photo";

export class PhotoApiRepository implements PhotoRepositoryInterface {
  private apiService: ApiService;
  private mapper: PhotoDataMapper;
  private endpoints: Endpoints;

  constructor(
    apiService: ApiService,
    mapper: PhotoDataMapper,
    endpoints: Endpoints
  ) {
    this.apiService = apiService;
    this.mapper = mapper;
    this.endpoints = endpoints;
  }

  public async getAllPhotos(): Promise<Photo[]> {
    const dataResponse = await this.apiService.invoke(
      "get",
      this.endpoints.photos()
    );
    return this.mapper.convertPhotoDataFromApi(dataResponse);
  }
}
