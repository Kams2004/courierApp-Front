import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsService, DetailedReportResponse } from '../../services/reports.service';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports implements OnInit {
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  reportData: DetailedReportResponse | null = null;
  isLoading = false;
  Math = Math;

  constructor(private reportsService: ReportsService) {}

  ngOnInit() {
    this.loadReport();
  }

  loadReport() {
    console.log('Loading report for:', this.selectedMonth, this.selectedYear);
    console.log('Token in localStorage:', localStorage.getItem('token'));
    console.log('User in localStorage:', localStorage.getItem('user'));
    
    this.isLoading = true;
    this.reportsService.getDetailedReport(this.selectedMonth, this.selectedYear).subscribe({
      next: (data) => {
        this.reportData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading report:', error);
        this.isLoading = false;
      }
    });
  }

  onDateChange() {
    this.loadReport();
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }

  printReport() {
    if (!this.reportData) return;
    
    const printContent = `
      <html>
        <head>
          <title>Rapport Courriers - ${this.getMonthName(this.selectedMonth)} ${this.selectedYear}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 25px; }
            .stats-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .stats-table th, .stats-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .stats-table th { background-color: #f5f5f5; }
            .summary { display: flex; justify-content: space-around; margin-bottom: 20px; }
            .summary-item { text-align: center; padding: 15px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Système de Gestion des Courriers</h1>
            <h2>Rapport Mensuel - ${this.getMonthName(this.selectedMonth)} ${this.selectedYear}</h2>
            <p>Généré le: ${this.getCurrentDate()}</p>
          </div>
          
          <div class="section">
            <h3>Nombre de courriers entrants/sortants par mois</h3>
            <div class="summary">
              <div class="summary-item">
                <strong>Courriers Entrants</strong><br>
                <span style="font-size: 24px;">${this.reportData.couriersEntrants}</span>
              </div>
              <div class="summary-item">
                <strong>Courriers Sortants</strong><br>
                <span style="font-size: 24px;">${this.reportData.couriersSortants}</span>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h3>Types de courriers les plus fréquents</h3>
            <table class="stats-table">
              <thead>
                <tr><th>Type de courrier</th><th>Nombre</th></tr>
              </thead>
              <tbody>
                ${this.getObjectKeys(this.reportData.typesFrequents).map(type => 
                  `<tr><td>${type}</td><td>${this.reportData!.typesFrequents[type]}</td></tr>`
                ).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="section">
            <h3>Départements les plus actifs</h3>
            <table class="stats-table">
              <thead>
                <tr><th>Département</th><th>Nombre de courriers</th></tr>
              </thead>
              <tbody>
                ${this.getObjectKeys(this.reportData.departementsActifs).map(dept => 
                  `<tr><td>${dept}</td><td>${this.reportData!.departementsActifs[dept]}</td></tr>`
                ).join('')}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }

  getMonthName(month: number): string {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months[month - 1] || '';
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
}
