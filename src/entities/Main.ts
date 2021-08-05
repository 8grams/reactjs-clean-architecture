import { Album } from "./Album";
import { User } from "./User";

export class Main {
  album: Album;
  user: User | null;
  constructor(album: Album, user: User | null) {
    this.album = album;
    this.user = user;
  }
}
