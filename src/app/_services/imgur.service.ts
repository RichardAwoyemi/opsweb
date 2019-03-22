import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

export interface ImgurResponse {
  data: any;
  success: boolean;
  status: string;
}

@Injectable()
export class ImgurService {
  IMGUR_UPLOAD_URL = 'https://api.imgur.com/3';
  IMGUR_API_KEY = '9c5e0e80c70435334bfc7a9186241f03bc35f854';
  IMGUR_CLIENT_ID = 'bdcf0bd3f309141';

  constructor(
    private logger: NGXLogger,
    private http: HttpClient
  ) {
  }

  upload(image) {
    this.logger.debug('Handling file input');
    this.logger.debug(image);
    this.logger.debug(`Uploading picture to ${this.IMGUR_UPLOAD_URL}`);
    const httpOptions = {
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${this.IMGUR_CLIENT_ID}`,
        Accept: 'application/json'
      }),
      mimeType: 'multipart/form-data'
    };
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<ImgurResponse>(`${this.IMGUR_UPLOAD_URL}/image`, formData, httpOptions);
  }
}
