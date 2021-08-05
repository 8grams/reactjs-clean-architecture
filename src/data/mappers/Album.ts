import { AxiosResponse } from "axios";
import { Album } from "../../entities/Album";

export class AlbumDataMapper {
  public convertAlbumDataFromApi(result: AxiosResponse<any>): Album[] {
    const { data } = result;
    return data.map((e: any) => new Album(e.userId, e.id, e.title));
  }

  public convertAlbumDetailFromApi(result: AxiosResponse<any>): Album {
    const { data } = result;
    return new Album(data.userId, data.id, data.title);
  }
}
