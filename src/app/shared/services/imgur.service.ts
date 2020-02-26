import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';

export interface ImgurResponse {
  data: any;
  success: boolean;
  status: number;
}

@Injectable()
export class ImgurService {
  private readonly IMGUR_UPLOAD_URL = 'https://api.imgur.com/3/image';
  private readonly IMGUR_CLIENT_ID = 'Client-ID bdcf0bd3f309141';

  constructor(
    private http: HttpClient
  ) {
  }

  upload(base64Img: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.IMGUR_CLIENT_ID}`);
    const formData = new FormData();
    formData.append('image', base64Img);
    formData.append('name', UtilService.generateRandomString(32));
    formData.append('type', 'base64');
    return this.http.post<ImgurResponse>(`${this.IMGUR_UPLOAD_URL}`, formData, {headers});
  }
}
