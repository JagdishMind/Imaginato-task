import { API_METHODS } from './appServices.type';
import { ServicesEndPoints } from './appServicesEndPoints';
import { getNewsCommercialResponseAdapter } from './commercial/adapters/response/getNewsCommercialResponseAdapter';
import { NewsResponseDTO } from './commercial/dtos/NewsResponseDTO';
import { UserListRequestParams } from './models/request';
import { NewsResult } from './models/response';
import serviceAdapter from './serviceAdapter';

export class AppServices {
  constructor() {}

  getNews = async (request: UserListRequestParams): Promise<NewsResult[]> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<NewsResponseDTO, undefined>(
        API_METHODS.GET,
        `${ServicesEndPoints.USER}?page=${request.page}&results=10&seed=abc`
      )
        .then(res => {
          resolve(new getNewsCommercialResponseAdapter().service(res));
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

export const appServices = new AppServices();
