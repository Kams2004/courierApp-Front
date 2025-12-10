import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService, UserResponse } from '../../../services/user.service';

@Component({
  selector: 'app-admin-users-listing-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-users-listing-page.html',
  styleUrl: './admin-users-listing-page.scss',
})
export class AdminUsersListingPage implements OnInit {
  users: UserResponse[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (error) => console.error('Error loading users:', error)
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: (error) => console.error('Error deleting user:', error)
    });
  }
}
