export class Endpoints {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  users(): string {
    return "/users";
  }

  albums(): string {
    return "/albums";
  }

  photos(): string {
    return "/photos";
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
  