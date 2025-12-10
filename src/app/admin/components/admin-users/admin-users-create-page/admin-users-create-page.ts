import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService, UserRequest } from '../../../services/user.service';
import { DepartmentService, DepartmentResponse } from '../../../services/department.service';

@Component({
  selector: 'app-admin-users-create-page',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './admin-users-create-page.html',
  styleUrl: './admin-users-create-page.scss',
})
export class AdminUsersCreatePage implements OnInit {
  userForm: FormGroup;
  departments: DepartmentResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private departmentService: DepartmentService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['EMPLOYEE', Validators.required],
      fonction: ['', Validators.required],
      departmentId: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (departments) => this.departments = departments,
      error: (error) => console.error('Error loading departments:', error)
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: UserRequest = this.userForm.value;
      this.userService.createUser(user).subscribe({
        next: () => this.router.navigate(['/admin/users']),
        error: (error) => console.error('Error creating user:', error)
      });
    }
  }
}
