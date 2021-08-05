import { Album } from "../../entities/Album";

export interface AlbumRepositoryInterface {
  getAllAlbums(): Promise<Album[]>;
  getAlbumById(albumId: number): Promise<Album>;
}
