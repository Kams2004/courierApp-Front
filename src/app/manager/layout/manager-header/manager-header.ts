import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manager-header',
  imports: [],
  templateUrl: './manager-header.html',
  styleUrl: './manager-header.scss',
})
export class ManagerHeader implements OnInit {
  userName = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userName = this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
  }
}
