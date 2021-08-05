export class Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  isFavorite: boolean;
  comment: string | null;
  isShowEdit: boolean;
  
  constructor(
    id: number,
    albumId: number,
    title: string,
    url: string,
    thumbnailUrl: string,
    isFavorite: boolean,
    comment: string | null,
    isShowEdit: boolean
  ) {
    this.albumId = albumId;
    this.id = id;
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
    this.isFavorite = isFavorite;
    this.comment = comment;
    this.isShowEdit = isShowEdit;
  }
}
