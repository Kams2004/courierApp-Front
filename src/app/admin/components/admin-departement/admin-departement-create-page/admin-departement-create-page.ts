import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DepartmentService, DepartmentRequest } from '../../../services/department.service';

@Component({
  selector: 'app-admin-departement-create-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-departement-create-page.html',
  styleUrl: './admin-departement-create-page.scss',
})
export class AdminDepartementCreatePage {
  departementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router
  ) {
    this.departementForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.departementForm.valid) {
      const department: DepartmentRequest = this.departementForm.value;
      this.departmentService.createDepartment(department).subscribe({
        next: () => this.router.navigate(['/admin/departements']),
        error: (error) => console.error('Error creating department:', error)
      });
    }
  }
}
