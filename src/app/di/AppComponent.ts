import { container } from "tsyringe";
import { PresenterModule } from "./PresenterModule";
import { MapperModule } from "./MapperModule";
import { RepositoryModule } from "./RepositoryModule";
import { RootModule } from "./RootModule";

export class AppComponent {
  public static init() {
    console.log(require('dotenv').config())
    RootModule.init(container);
    RepositoryModule.init(container);
    MapperModule.init(container);
    PresenterModule.init(container);
  }
}
