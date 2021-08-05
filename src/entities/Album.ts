export class Album {
  id: number;
  userId: number;
  title: string;
  constructor(userId: number, id: number, title: string) {
    this.userId = userId;
    this.id = id;
    this.title = title;
  }
}
