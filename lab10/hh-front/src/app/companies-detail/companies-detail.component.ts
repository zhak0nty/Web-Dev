import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Company } from '../models/company';
import { Vacancy } from '../models/vacancy';

@Component({
  selector: 'app-companies-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './companies-detail.component.html',
})
export class CompanyDetailComponent implements OnInit {
  company: Company | null = null;
  vacancies: Vacancy[] = [];
  loadingCompany = true;
  loadingVacancies = true;
  error = '';
  
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const companyId = +params['id'];
      if (companyId) {
        this.loadCompanyDetails(companyId);
        this.loadCompanyVacancies(companyId);
      }
    });
  }
  
  loadCompanyDetails(id: number): void {
    this.loadingCompany = true;
    this.apiService.getCompanyById(id).subscribe({
      next: (data) => {
        this.company = data;
        this.loadingCompany = false;
      },
      error: (err) => {
        this.error = 'Failed to load company details. Please try again later.';
        console.error('Error loading company details:', err);
        this.loadingCompany = false;
      }
    });
  }
  
  loadCompanyVacancies(companyId: number): void {
    this.loadingVacancies = true;
    this.apiService.getVacanciesByCompany(companyId).subscribe({
      next: (data) => {
        this.vacancies = data.vacancies;
        this.loadingVacancies = false;
      },
      error: (err) => {
        this.error = 'Failed to load company vacancies. Please try again later.';
        console.error('Error loading company vacancies:', err);
        this.loadingVacancies = false;
      }
    });
  }
}