import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Courier } from '../../../interfaces/courier.interface';

@Component({
  selector: 'app-courier-update-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './courier-update-page.html',
  styleUrl: './courier-update-page.scss',
})
export class CourierUpdatePage implements OnInit {
  courierForm: FormGroup;
  courierId: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.courierForm = this.fb.group({
      type: ['ENTRANT', Validators.required],
      mailType: ['LETTRE', Validators.required],
      date: ['', Validators.required],
      sender: ['', Validators.required],
      recipient: ['', Validators.required],
      object: ['', Validators.required],
      departmentId: [1, Validators.required]
    });
  }

  ngOnInit() {
    this.courierId = this.route.snapshot.params['id'];
    this.loadCourier();
  }

  loadCourier() {
    const mockData = {
      type: 'ENTRANT',
      mailType: 'LETTRE',
      date: '2024-01-15',
      sender: 'Société ABC',
      recipient: 'Service Commercial',
      object: 'Demande de devis',
      departmentId: 1
    };
    this.courierForm.patchValue(mockData);
  }

  onSubmit() {
    if (this.courierForm.valid) {
      const courier: Courier = this.courierForm.value;
      console.log('Updating courier:', courier);
    }
  }
}
