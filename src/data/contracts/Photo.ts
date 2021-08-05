import { Photo } from "../../entities/Photo";

export interface PhotoRepositoryInterface {
  getAllPhotos(): Promise<Photo[]>;
}
