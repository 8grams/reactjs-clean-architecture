import { AxiosResponse } from "axios";
import { Photo } from "../../entities/Photo";

export class PhotoDataMapper {
  public convertPhotoDataFromApi(result: AxiosResponse<any>): Photo[] {
    const { data } = result;
    return data.map(
      (e: any) =>
        new Photo(
          e.albumId,
          e.id,
          e.title,
          e.url,
          e.thumbnailUrl,
          false,
          null,
          false
        )
    );
  }
}
