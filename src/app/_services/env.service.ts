import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class EnvService {
  public getApiUrl(): string {
    let apiUrl = '';
    // Local
    if (location.host === 'localhost:4200') {
      apiUrl = 'http://localhost:8080';
    // Production
    } else if (environment.production === true) {
      apiUrl = 'http://opsonion-api.herokuapp.com/';
    // UAT
    } else {
      apiUrl = 'http://opsonion-api.herokuapp.com/';
    }
    return apiUrl;
  }
}
