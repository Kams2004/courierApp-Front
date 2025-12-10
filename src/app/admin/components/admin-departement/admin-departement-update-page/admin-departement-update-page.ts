import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DepartmentService, DepartmentRequest } from '../../../services/department.service';

@Component({
  selector: 'app-admin-departement-update-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-departement-update-page.html',
  styleUrl: './admin-departement-update-page.scss',
})
export class AdminDepartementUpdatePage implements OnInit {
  departementForm: FormGroup;
  departmentId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.departementForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.departmentId = +this.route.snapshot.params['id'];
    this.loadDepartement();
  }

  loadDepartement() {
    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        const department = departments.find(d => d.id === this.departmentId);
        if (department) {
          this.departementForm.patchValue(department);
        }
      },
      error: (error) => console.error('Error loading department:', error)
    });
  }

  onSubmit() {
    if (this.departementForm.valid) {
      const department: DepartmentRequest = this.departementForm.value;
      this.departmentService.updateDepartment(this.departmentId, department).subscribe({
        next: () => this.router.navigate(['/admin/departements']),
        error: (error) => console.error('Error updating department:', error)
      });
    }
  }
}
