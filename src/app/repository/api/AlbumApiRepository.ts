import { AlbumRepositoryInterface } from "../../../data/contracts/Album";
import { AlbumDataMapper } from "../../../data/mappers/Album";
import { Endpoints } from "../../misc/Endpoints";
import ApiService from "../../services/ApiService";
import { Album } from "../../../entities/Album";

export class AlbumApiRepository implements AlbumRepositoryInterface {
  private apiService: ApiService;
  private mapper: AlbumDataMapper;
  private endpoints: Endpoints;

  constructor(
    apiService: ApiService,
    mapper: AlbumDataMapper,
    endpoints: Endpoints
  ) {
    this.apiService = apiService;
    this.mapper = mapper;
    this.endpoints = endpoints;
  }

  public async getAllAlbums(): Promise<Album[]> {
    const dataResponse = await this.apiService.invoke(
      "get",
      this.endpoints.albums()
    );
    return this.mapper.convertAlbumDataFromApi(dataResponse);
  }

  public async getAlbumById(albumId: number): Promise<Album> {
    const dataResponse = await this.apiService.invoke(
      "get",
      `${this.endpoints.albums()}/${albumId}`
    );
    return this.mapper.convertAlbumDetailFromApi(dataResponse);
  }
}
