import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CourierRequest {
  type: 'ENTRANT' | 'SORTANT';
  mailType: 'LETTRE' | 'COLIS' | 'RECOMMANDE' | 'EXPRESS';
  date: string;
  sender: string;
  recipient: string;
  object: string;
  departmentId: number;
}

export interface CourierResponse {
  id: number;
  reference: string;
  type: 'ENTRANT' | 'SORTANT';
  mailType: 'LETTRE' | 'COLIS' | 'RECOMMANDE' | 'EXPRESS';
  date: string;
  sender: string;
  recipient: string;
  object: string;
  status: 'EN_ATTENTE' | 'EN_COURS' | 'TRAITE' | 'ARCHIVE';
  registeredByName: string;
  departmentName: string;
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourierSearchRequest {
  sender?: string;
  recipient?: string;
  object?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  private apiUrl = `${environment.apiUrl}/couriers`;

  constructor(private http: HttpClient) {}

  getCouriers(): Observable<CourierResponse[]> {
    return this.http.get<CourierResponse[]>(this.apiUrl);
  }

  createCourier(courier: CourierRequest, userId: number): Observable<CourierResponse> {
    return this.http.post<CourierResponse>(`${this.apiUrl}?userId=${userId}`, courier);
  }

  updateCourierStatus(id: number, status: string): Observable<CourierResponse> {
    return this.http.patch<CourierResponse>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }

  deleteCourier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchCouriers(searchCriteria: CourierSearchRequest): Observable<CourierResponse[]> {
    return this.http.post<CourierResponse[]>(`${this.apiUrl}/search`, searchCriteria);
  }

  uploadFile(file: File): Observable<{url: string, filename: string, contentType: string}> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{url: string, filename: string, contentType: string}>(`${environment.apiUrl}/files/upload`, formData);
  }

  attachFile(courierId: number, fileUrl: string, fileName: string, fileType: string): Observable<any> {
    const formData = new FormData();
    formData.append('fileUrl', fileUrl);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);
    return this.http.post(`${this.apiUrl}/${courierId}/attachment`, formData);
  }

  downloadFile(courierId: number): Observable<{url: string, filename: string, contentType: string}> {
    return this.http.get<{url: string, filename: string, contentType: string}>(`${environment.apiUrl}/files/download/${courierId}`);
  }
}