import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ReportResponse {
  totalEntrants: number;
  totalSortants: number;
  mailTypeStats: { [key: string]: number };
  departmentStats: { [key: string]: number };
}

export interface DetailedReportResponse {
  couriersEntrants: number;
  couriersSortants: number;
  typesFrequents: { [key: string]: number };
  departementsActifs: { [key: string]: number };
  mois: number;
  annee: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  getMonthlyReport(month: number, year: number): Observable<ReportResponse> {
    return this.http.get<ReportResponse>(`${this.apiUrl}/monthly?month=${month}&year=${year}`);
  }

  getDetailedReport(month: number, year: number): Observable<DetailedReportResponse> {
    return this.http.get<DetailedReportResponse>(`${this.apiUrl}/detailed?month=${month}&year=${year}`);
  }
}