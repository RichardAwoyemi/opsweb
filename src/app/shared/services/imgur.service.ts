import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

export interface ImgurResponse {
  data: any;
  success: boolean;
  status: string;
}

@Injectable()
export class ImgurService {
  private readonly IMGUR_UPLOAD_URL = 'https://api.imgur.com/3/image';
  private readonly IMGUR_CLIENT_ID = 'Client-ID bdcf0bd3f309141';

  constructor(
    private logger: NGXLogger,
    private http: HttpClient
  ) {
  }

  upload(base64Img: string, uid: string) {
    this.logger.debug('Handling file input');
    this.logger.debug(base64Img);
    this.logger.debug(`Uploading picture to ${ this.IMGUR_UPLOAD_URL }`);
    const headers = new HttpHeaders().set('Authorization', `${ this.IMGUR_CLIENT_ID }`);
    const formData = new FormData();
    formData.append('image', base64Img);
    formData.append('name', uid);
    formData.append('type', 'base64');
    return this.http.post<ImgurResponse>(`${ this.IMGUR_UPLOAD_URL }`, formData, { headers });
  }
}
