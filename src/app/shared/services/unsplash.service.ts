import { Injectable } from '@angular/core';
import Unsplash from 'unsplash-js';
import { environment } from '../../../environments/environment';

@Injectable()
export class  UnsplashService {
  getUnsplashApi(): Unsplash {
    return new Unsplash({
      accessKey: environment.unsplashAccessKey,
    });
  }

  async searchImages(query: String, pageIndex: number = 1, elementsPerPage: number = 30): Promise<any> {
    let response = await this.getUnsplashApi().search.photos(query, pageIndex, elementsPerPage);
    let json: any = await response.json();
    return await json.results;
  }
}
