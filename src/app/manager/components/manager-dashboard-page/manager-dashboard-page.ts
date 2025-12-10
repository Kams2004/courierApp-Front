import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourierService, CourierResponse } from '../../services/courier.service';

@Component({
  selector: 'app-manager-dashboard-page',
  imports: [CommonModule],
  templateUrl: './manager-dashboard-page.html',
  styleUrl: './manager-dashboard-page.scss',
})
export class ManagerDashboardPage implements OnInit {
  totalCouriers = 0;
  entrantCouriers = 0;
  sortantCouriers = 0;
  enAttenteCouriers = 0;
  enCoursCouriers = 0;
  traiteCouriers = 0;
  archiveCouriers = 0;
  isLoading = true;

  constructor(private courierService: CourierService) {}

  ngOnInit() {
    this.loadCourierStats();
  }

  loadCourierStats() {
    this.courierService.getCouriers().subscribe({
      next: (couriers) => {
        this.calculateStats(couriers);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des courriers:', error);
        this.isLoading = false;
      }
    });
  }

  calculateStats(couriers: CourierResponse[]) {
    this.totalCouriers = couriers.length;
    this.entrantCouriers = couriers.filter(c => c.type === 'ENTRANT').length;
    this.sortantCouriers = couriers.filter(c => c.type === 'SORTANT').length;
    this.enAttenteCouriers = couriers.filter(c => c.status === 'EN_ATTENTE').length;
    this.enCoursCouriers = couriers.filter(c => c.status === 'EN_COURS').length;
    this.traiteCouriers = couriers.filter(c => c.status === 'TRAITE').length;
    this.archiveCouriers = couriers.filter(c => c.status === 'ARCHIVE').length;
  }
}
