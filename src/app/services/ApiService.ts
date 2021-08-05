/* eslint-disable */
import { AxiosInstance, Method, AxiosResponse } from "axios";
import qs from "qs";
import { injectable } from "tsyringe";

@injectable()
export default class ApiService {
  public client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  public async invoke(
    method: Method = "get",
    url = "",
    params: any = {},
    payload: any = null,
    headers: Map<string, string> = new Map()
  ): Promise<AxiosResponse<any>> {
    // content-type application/json
    this.client.defaults.headers["Content-Type"] =
      "application/x-www-form-urlencoded";
    // set custom header if any
    headers.forEach((value: string, key: string) => {
      this.client.defaults.headers.common[key] = value;
    });
    const data = {
      "api.token": "token",
    };
    return await this.client.request({
      url,
      params,
      paramsSerializer: (par) => qs.stringify(par, { encode: false }),
      data: payload
        ? qs.stringify({ ...data, ...payload })
        : qs.stringify(data),
      method,
    });
  }
}
