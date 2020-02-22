import { Component, OnDestroy, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { FormUsernameInputService } from './form-username-input.service';
import { SimpleModalService } from '../simple-modal/simple-modal.service';
import { UserService } from '../../services/user.service';
import { IUser } from 'src/app/shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';

@Component({
  selector: 'app-form-username-input',
  templateUrl: './form-username-input.component.html',
  styleUrls: ['./form-username-input.component.css']
})
export class FormUsernameInputComponent implements OnInit, OnDestroy {
  showUsernameError = false;
  username: string;
  user: IUser;
  private usernameSubscription: Subscription;

  constructor(
    private userService: UserService,
    private simpleModalService: SimpleModalService,
    private formUsernameInputService: FormUsernameInputService,
    private userStore: Store<fromUser.State>,
    private logger: NGXLogger
  ) {
  }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.username = result.username;
          this.user = result;
        }
      });
  }

  onClickCheckUsernameAvailability() {
    let messageDisplayed = false;
    if (this.username) {
      this.showUsernameError = false;
      this.username = this.username.replace(/[^\w\s]/gi, '').trim().replace(/\b\w/g, (s) => s.toLowerCase());
      this.usernameSubscription = this.userService.getUserByUsername(this.username).subscribe((result) => {
        if (result) {
          if ((result.length > 0) && (result[0]['username'] === this.username.toLowerCase().trim()) &&
            (result[0]['uid'] !== this.user.uid)) {
            this.logger.debug('Username belongs to another user');
            this.formUsernameInputService.usernameExists = true;
            if (!messageDisplayed) {
              this.simpleModalService.displayMessage('Oops!', 'This username is already in use.');
              messageDisplayed = true;
            }
          } else {
            this.logger.debug('Username does not belong to another user');
            this.formUsernameInputService.usernameExists = false;
            if (!messageDisplayed) {
              this.simpleModalService.displayMessage('Great!', 'This username is available to use.');
              messageDisplayed = true;
            }
            const user = JSON.parse(JSON.stringify(this.user));
            user.username = this.username;
            this.user = user;
          }
        } else {
          this.logger.debug('Username could not be determined');
          this.formUsernameInputService.usernameExists = true;
          if (!messageDisplayed) {
            this.simpleModalService.displayMessage('Oops!', 'An error has occurred. Please try again.');
            messageDisplayed = true;
          }
        }
      });
    } else {
      this.showUsernameError = true;
    }
  }

  onKeydownCheckUsername() {
    this.showUsernameError = false;
    this.formUsernameInputService.usernameExists = true;
  }

  ngOnDestroy() {
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
  }
}
