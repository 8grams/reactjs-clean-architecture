import { DependencyContainer } from "tsyringe";
import { UserApiRepository } from "../repository/api/UserApiRepository";
import { AlbumApiRepository } from "../repository/api/AlbumApiRepository";
import { PhotoApiRepository } from "../repository/api/PhotoApiRepository";

import { UserPresenter } from "../../data/Presenters/UserPresenter";
import { AlbumPresenter } from "../../data/Presenters/AlbumPresenter";
import { PhotoPresenter } from "../../data/Presenters/PhotoPresenter";

export class PresenterModule {
  public static init(container: DependencyContainer) {
    container.register<UserPresenter>(UserPresenter, {
      useFactory: (d) => {
        return new UserPresenter(d.resolve(UserApiRepository));
      },
    });
    container.register<AlbumPresenter>(AlbumPresenter, {
      useFactory: (d) => {
        return new AlbumPresenter(d.resolve(AlbumApiRepository));
      },
    });
    container.register<PhotoPresenter>(PhotoPresenter, {
      useFactory: (d) => {
        return new PhotoPresenter(d.resolve(PhotoApiRepository));
      },
    });
  }
}
