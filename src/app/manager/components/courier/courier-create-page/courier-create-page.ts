import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourierService, CourierRequest } from '../../../services/courier.service';
import { AuthService } from '../../../services/auth.service';
import { DepartmentService, DepartmentResponse } from '../../../../admin/services/department.service';
import { UserService, UserResponse } from '../../../../admin/services/user.service';

@Component({
  selector: 'app-courier-create-page',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './courier-create-page.html',
  styleUrl: './courier-create-page.scss',
})
export class CourierCreatePage implements OnInit {
  courierForm: FormGroup;
  departments: DepartmentResponse[] = [];
  users: UserResponse[] = [];
  selectedDepartmentId: number | null = null;
  selectedFile: File | null = null;
  isUploading = false;

  constructor(
    private fb: FormBuilder,
    private courierService: CourierService,
    private authService: AuthService,
    private departmentService: DepartmentService,
    private userService: UserService,
    private router: Router
  ) {
    this.courierForm = this.fb.group({
      type: ['ENTRANT', Validators.required],
      mailType: ['LETTRE', Validators.required],
      date: ['', Validators.required],
      recipient: ['', Validators.required],
      object: ['', Validators.required],
      departmentId: [null, Validators.required]
    });
  }

  ngOnInit() {
    console.log('Stored auth response:', localStorage.getItem('authResponse'));
    console.log('Stored user:', localStorage.getItem('user'));
    console.log('Stored token:', localStorage.getItem('token'));
    console.log('Auth service getUserId():', this.authService.getUserId());
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (departments) => this.departments = departments,
      error: (error) => console.error('Error loading departments:', error)
    });
  }

  onDepartmentChange(departmentId: number) {
    this.selectedDepartmentId = departmentId;
    this.courierForm.patchValue({ recipient: '' });
    
    if (departmentId) {
      this.userService.getUsersByDepartment(departmentId).subscribe({
        next: (users) => this.users = users,
        error: (error) => console.error('Error loading users:', error)
      });
    } else {
      this.users = [];
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.courierForm.valid) {
      const formData = this.courierForm.value;
      const currentUserId = this.authService.getUserId();
      const senderName = this.authService.getUserName();
      
      const courier: CourierRequest = {
        ...formData,
        sender: senderName
      };
      
      if (currentUserId) {
        this.isUploading = true;
        
        // Create courier first
        this.courierService.createCourier(courier, currentUserId).subscribe({
          next: (response) => {
            // If file selected, upload and attach it
            if (this.selectedFile) {
              this.courierService.uploadFile(this.selectedFile).subscribe({
                next: (fileResponse) => {
                  this.courierService.attachFile(
                    response.id,
                    fileResponse.url,
                    fileResponse.filename,
                    fileResponse.contentType
                  ).subscribe({
                    next: () => {
                      this.isUploading = false;
                      this.router.navigate(['/manager/couriers']);
                    },
                    error: (error) => {
                      console.error('Error attaching file:', error);
                      this.isUploading = false;
                      this.router.navigate(['/manager/couriers']);
                    }
                  });
                },
                error: (error) => {
                  console.error('Error uploading file:', error);
                  this.isUploading = false;
                  this.router.navigate(['/manager/couriers']);
                }
              });
            } else {
              this.isUploading = false;
              this.router.navigate(['/manager/couriers']);
            }
          },
          error: (error) => {
            console.error('Error creating courier:', error);
            this.isUploading = false;
          }
        });
      }
    }
  }
}
