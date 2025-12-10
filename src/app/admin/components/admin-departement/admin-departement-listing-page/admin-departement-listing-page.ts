import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DepartmentService, DepartmentResponse } from '../../../services/department.service';

@Component({
  selector: 'app-admin-departement-listing-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-departement-listing-page.html',
  styleUrl: './admin-departement-listing-page.scss',
})
export class AdminDepartementListingPage implements OnInit {
  departements: DepartmentResponse[] = [];

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (departments) => this.departements = departments,
      error: (error) => console.error('Error loading departments:', error)
    });
  }

  deleteDepartement(id: number) {
    this.departmentService.deleteDepartment(id).subscribe({
      next: () => this.loadDepartments(),
      error: (error) => console.error('Error deleting department:', error)
    });
  }
}
