import { DependencyContainer } from "tsyringe";
import { Endpoints } from "../misc/Endpoints";
import ApiService from "../services/ApiService";
import Axios, { AxiosInstance } from "axios";

export class RootModule {
  public static init(container: DependencyContainer) {

    container.register<Endpoints>(Endpoints, {
      useFactory: (_) => {
        return new Endpoints("https://jsonplaceholder.typicode.com");
      },
    });

    container.register<ApiService>(ApiService, {
      useFactory: (d) => {
        return new ApiService(d.resolve('AxiosInstance'));
      },
    });

    container.register<AxiosInstance>('AxiosInstance', {      
      useFactory: (d) => {
        var client = Axios.create({
          baseURL: d.resolve(Endpoints).getBaseUrl(),
          timeout: 50000,
        });

        client.interceptors.response.use((response: any) => {
          return response;
        });
        
        client.interceptors.request.use(async (request: any) => {
          return request;
        });

        return client;
      },
    });

  }
}
