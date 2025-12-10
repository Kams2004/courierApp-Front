import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourierService, CourierResponse } from '../../../services/courier.service';

@Component({
  selector: 'app-courier-listing-page',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './courier-listing-page.html',
  styleUrl: './courier-listing-page.scss',
})
export class CourierListingPage implements OnInit {
  couriers: CourierResponse[] = [];
  showDeleteModal = false;
  courierToDelete: number | null = null;
  showStatusModal = false;
  courierToUpdate: CourierResponse | null = null;
  selectedStatus = '';
  showPreviewModal = false;
  previewCourier: CourierResponse | null = null;

  constructor(private courierService: CourierService) {}

  ngOnInit() {
    this.loadCouriers();
  }

  loadCouriers() {
    this.courierService.getCouriers().subscribe({
      next: (couriers) => this.couriers = couriers,
      error: (error) => console.error('Error loading couriers:', error)
    });
  }

  confirmDelete(id: number) {
    this.courierToDelete = id;
    this.showDeleteModal = true;
  }

  deleteCourier() {
    if (this.courierToDelete) {
      this.courierService.deleteCourier(this.courierToDelete).subscribe({
        next: () => {
          this.loadCouriers();
          this.closeDeleteModal();
        },
        error: (error) => console.error('Error deleting courier:', error)
      });
    }
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.courierToDelete = null;
  }

  openStatusModal(courier: CourierResponse) {
    this.courierToUpdate = courier;
    this.selectedStatus = courier.status;
    this.showStatusModal = true;
  }

  closeStatusModal() {
    this.showStatusModal = false;
    this.courierToUpdate = null;
    this.selectedStatus = '';
  }

  updateCourierStatus() {
    if (this.courierToUpdate && this.selectedStatus) {
      this.courierService.updateCourierStatus(this.courierToUpdate.id, this.selectedStatus).subscribe({
        next: () => {
          this.loadCouriers();
          this.closeStatusModal();
        },
        error: (error) => console.error('Error updating status:', error)
      });
    }
  }

  downloadFile(courierId: number) {
    this.courierService.downloadFile(courierId).subscribe({
      next: (fileInfo) => {
        const link = document.createElement('a');
        link.href = fileInfo.url;
        link.download = fileInfo.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error: (error) => console.error('Error downloading file:', error)
    });
  }

  previewFile(courier: CourierResponse) {
    this.previewCourier = courier;
    this.showPreviewModal = true;
  }

  closePreviewModal() {
    this.showPreviewModal = false;
    this.previewCourier = null;
  }

  getPreviewUrl(attachmentUrl: string | undefined, contentType: string | undefined): string {
    if (!attachmentUrl || !contentType) return '';
    if (contentType === 'application/pdf') {
      return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(attachmentUrl)}`;
    }
    return attachmentUrl;
  }

  isImage(contentType: string | undefined): boolean {
    return contentType?.startsWith('image/') || false;
  }

  isPdf(contentType: string | undefined): boolean {
    return contentType === 'application/pdf';
  }

  updateStatus(id: number, status: string) {
    this.courierService.updateCourierStatus(id, status).subscribe({
      next: () => this.loadCouriers(),
      error: (error) => console.error('Error updating status:', error)
    });
  }
}
