import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class EnvService {
  public getApiUrl(): string {
    let apiUrl = '';
    if (location.host == 'localhost:4200') {
      apiUrl = 'http://localhost:8080';
    }
    else if (environment.production === true) {
      apiUrl = '';
    }
    else {
      apiUrl = '';
    }
    return apiUrl;
  }
}