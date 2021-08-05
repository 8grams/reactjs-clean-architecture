import { DependencyContainer } from "tsyringe";
import { UserDataMapper } from "../../data/mappers/User";
import { AlbumDataMapper } from "../../data/mappers/Album";
import { PhotoDataMapper } from "../../data/mappers/Photo";

export class MapperModule {
  public static init(container: DependencyContainer) {
    container.register<UserDataMapper>(UserDataMapper, {
      useClass: UserDataMapper,
    });
    container.register<AlbumDataMapper>(AlbumDataMapper, {
      useClass: AlbumDataMapper,
    });
    container.register<PhotoDataMapper>(PhotoDataMapper, {
      useClass: PhotoDataMapper,
    });
  }
}
