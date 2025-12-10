import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService, UserRequest } from '../../../services/user.service';
import { DepartmentService, DepartmentResponse } from '../../../services/department.service';

@Component({
  selector: 'app-admin-users-update-page',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './admin-users-update-page.html',
  styleUrl: './admin-users-update-page.scss',
})
export class AdminUsersUpdatePage implements OnInit {
  userForm: FormGroup;
  userId: number = 0;
  departments: DepartmentResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private departmentService: DepartmentService
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
    this.userId = +this.route.snapshot.params['id'];
    this.loadDepartments();
    this.loadUser();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (departments) => this.departments = departments,
      error: (error) => console.error('Error loading departments:', error)
    });
  }

  loadUser() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        const user = users.find(u => u.id === this.userId);
        if (user) {
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: '',
            role: user.role,
            fonction: user.fonction,
            departmentId: user.departmentId
          });
        }
      },
      error: (error) => console.error('Error loading user:', error)
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: UserRequest = this.userForm.value;
      this.userService.updateUser(this.userId, user).subscribe({
        next: () => this.router.navigate(['/admin/users']),
        error: (error) => console.error('Error updating user:', error)
      });
    }
  }
}
