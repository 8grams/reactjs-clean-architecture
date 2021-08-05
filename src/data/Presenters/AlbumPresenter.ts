import { injectable } from "tsyringe";
import { AlbumApiRepository } from "../../app/repository/api/AlbumApiRepository";
import { Album } from "../../entities/Album";

@injectable()
export class AlbumPresenter {
  private repository: AlbumApiRepository;
  constructor(repository: AlbumApiRepository) {
    this.repository = repository;
  }

  public getAllAlbumPresenter(): Promise<Album[]> {
    return this.repository.getAllAlbums();
  }

  public getAlbumByIdPresenter(albumId: number): Promise<Album> {
    return this.repository.getAlbumById(albumId);
  }
}
