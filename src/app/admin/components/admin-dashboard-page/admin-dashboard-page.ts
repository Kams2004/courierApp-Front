import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-admin-dashboard-page',
  imports: [],
  templateUrl: './admin-dashboard-page.html',
  styleUrl: './admin-dashboard-page.scss',
})
export class AdminDashboardPage implements OnInit {
  totalUsers = 0;
  totalDepartments = 0;

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.userService.getUsers().subscribe({
      next: (users) => this.totalUsers = users.length,
      error: (error) => console.error('Error loading users:', error)
    });

    this.departmentService.getDepartments().subscribe({
      next: (departments) => this.totalDepartments = departments.length,
      error: (error) => console.error('Error loading departments:', error)
    });
  }
}
