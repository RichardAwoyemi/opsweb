import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageLibraryService {
  private IMAGE_LIBRARY = './assets/data/img-library/img-library.json';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getImageDetails() {
    return this.httpServiceRequest(this.IMAGE_LIBRARY);
  }

  private httpServiceRequest(location): Observable<any> {
    return this.httpClient.get(location);
  }
}
