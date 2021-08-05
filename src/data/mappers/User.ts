import { User, Address, Company, Geo } from "../../entities/User";
import { AxiosResponse } from "axios";

export class UserDataMapper {
  public convertUserDataFromApi(result: AxiosResponse<any>): User[] {
    const { data } = result;
    return data.map(
      (e: any) =>
        new User(
          e.id,
          e.name,
          e.username,
          e.email,
          new Address(
            e.address.street,
            e.address.suite,
            e.address.city,
            e.address.zipcode,
            new Geo(e.address.geo.lat, e.address.geo.lng)
          ),
          e.phone,
          e.website,
          new Company(e.company.name, e.company.catchPhrase, e.company.bs)
        )
    );
  }

  public convertUserByIdFromApi(result: AxiosResponse<any>): User {
    const { data } = result;
    return new User(
      data.id,
      data.name,
      data.username,
      data.email,
      new Address(
        data.address.street,
        data.address.suite,
        data.address.city,
        data.address.zipcode,
        new Geo(data.address.geo.lat, data.address.geo.lng)
      ),
      data.phone,
      data.website,
      new Company(data.company.name, data.company.catchPhrase, data.company.bs)
    );
  }
}
