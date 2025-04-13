import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Company } from '../models/company';

@Component({
  selector: 'app-companies-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './companies-list.component.html',
})
export class CompaniesListComponent implements OnInit {
  companies: Company[] = [];
  loading = true;
  error = '';
  
  constructor(private apiService: ApiService, private router: Router) { }
  
  ngOnInit(): void {
    this.loadCompanies();
  }
  
  loadCompanies(): void {
    this.loading = true;
    this.apiService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load companies. Please try again later.';
        console.error('Error loading companies:', err);
        this.loading = false;
      }
    });
  }
  
  selectCompany(id: number): void {
    this.router.navigate(['/companies', id]);
  }
}
