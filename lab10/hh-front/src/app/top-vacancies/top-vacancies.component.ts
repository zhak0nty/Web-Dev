import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Vacancy } from '../models/vacancy';

interface VacancyWithCompanyName extends Vacancy {
  company_name?: string;
}

@Component({
  selector: 'app-top-vacancies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-vacancies.component.html',
})
export class TopVacanciesComponent implements OnInit {
  vacancies: VacancyWithCompanyName[] = [];
  loading = true;
  error = '';
  
  constructor(private apiService: ApiService) { }
  
  ngOnInit(): void {
    this.loadTopVacancies();
  }
  
  loadTopVacancies(): void {
    this.loading = true;
    this.apiService.getTopTenVacancies().subscribe({
      next: (data: any[]) => {
        this.vacancies = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load top vacancies. Please try again later.';
        console.error('Error loading top vacancies:', err);
        this.loading = false;
      }
    });
  }
}