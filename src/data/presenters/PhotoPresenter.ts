import { injectable } from "tsyringe";
import { PhotoApiRepository } from "../../app/repository/api/PhotoApiRepository";
import { Photo } from "../../entities/Photo";

@injectable()
export class PhotoPresenter {
  private repository: PhotoApiRepository;
  constructor(repository: PhotoApiRepository) {
    this.repository = repository;
  }

  public getAllPhotoPresenter(): Promise<Photo[]> {
    return this.repository.getAllPhotos();
  }
}
