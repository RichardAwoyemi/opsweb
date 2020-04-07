import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Template } from '../models/template';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageLibraryService {

  activeImage = new BehaviorSubject<Object>(null);
  selectedTemplate: Subject<Template> = new Subject<Template>();
  private IMAGE_DETAILS = './assets/lib/img-details.json';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getImageDetails() {
    return this.httpServiceRequest(this.IMAGE_DETAILS);
  }

  private httpServiceRequest(location): Observable<any> {
    return this.httpClient.get(location);
  }
}
