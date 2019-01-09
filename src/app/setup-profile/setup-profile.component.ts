import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.component.html',
  styleUrls: ['./setup-profile.component.css']
})
export class SetupProfileComponent implements OnInit {
  user: any;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user.photoURL) {
      this.user.photoURL = 'https://i.imgflip.com/1slnr0.jpg';
    }
  }

  uploadAvatar() {
    alert('hello');
  }
}
