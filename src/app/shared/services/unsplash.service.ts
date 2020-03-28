import { Injectable } from '@angular/core';
import Unsplash from 'unsplash-js';
import { environment } from '../../../environments/environment';

@Injectable()
export class UnsplashService {
  static getUnsplashApi(): Unsplash {
    return new Unsplash({
      accessKey: environment.unsplashAccessKey,
    });
  }

  static async searchImages(query: String, pageIndex: number = 1, elementsPerPage: number = 30): Promise<any> {
    const response = await UnsplashService.getUnsplashApi().search.photos(query, pageIndex, elementsPerPage);
    const json: any = await response.json();
    return await json.results;
  }
}
