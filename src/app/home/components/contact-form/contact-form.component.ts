import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent {
  headerPadding$: Observable<any>;
}
