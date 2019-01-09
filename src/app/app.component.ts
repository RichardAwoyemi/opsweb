import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { useAnimation } from '@angular/animations';
import { ifStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Opsonion';
  isMobile: Observable<BreakpointState>;
  user: any;
  today: number = Date.now();

  constructor(
    private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    public afAuth: AngularFireAuth,
    public db: AngularFirestore,
    public authService: AuthService) {
    this.afAuth.authState.subscribe(response => {
      if (response) {
        const userDoc = db.doc<any>(`users/${response.uid}`);
        userDoc.snapshotChanges().subscribe(value => {
          this.user = {
            firstName: value.payload.data().firstName,
            lastName: value.payload.data().lastName,
            email: value.payload.data().email,
            photoURL: value.payload.data().photoURL,
            username: value.payload.data().username
          };
          if (!this.user.photoUrl) {
            this.user.photoURL = 'https://i.imgur.com/8n6ODeX.png';
          }
        });
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
  }

  onActivate(_event) {
    window.scroll(0, 0);
  }
}
