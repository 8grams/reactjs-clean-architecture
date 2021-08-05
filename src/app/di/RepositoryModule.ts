import { DependencyContainer } from "tsyringe";
import ApiService from "../services/ApiService";
import { Endpoints } from "../misc/Endpoints";

import { UserDataMapper } from "../../data/mappers/User";
import { AlbumDataMapper } from "../../data/mappers/Album";
import { PhotoDataMapper } from "../../data/mappers/Photo";

import { UserApiRepository } from "../repository/api/UserApiRepository";
import { AlbumApiRepository } from "../repository/api/AlbumApiRepository";
import { PhotoApiRepository } from "../repository/api/PhotoApiRepository";

export class RepositoryModule {
  public static init(container: DependencyContainer) {
    container.register<UserApiRepository>(UserApiRepository, {
      useFactory: (d) => {
        return new UserApiRepository(
          d.resolve(ApiService),
          d.resolve(UserDataMapper),
          d.resolve(Endpoints)
        );
      },
    });

    container.register<AlbumApiRepository>(AlbumApiRepository, {
      useFactory: (d) => {
        return new AlbumApiRepository(
          d.resolve(ApiService),
          d.resolve(AlbumDataMapper),
          d.resolve(Endpoints)
        );
      },
    });
    
    container.register<PhotoApiRepository>(PhotoApiRepository, {
      useFactory: (d) => {
        return new PhotoApiRepository(
          d.resolve(ApiService),
          d.resolve(PhotoDataMapper),
          d.resolve(Endpoints)
        );
      },
    });
  }
}
