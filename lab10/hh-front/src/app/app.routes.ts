import { Routes } from '@angular/router';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompanyDetailComponent } from './companies-detail/companies-detail.component';
import { TopVacanciesComponent } from './top-vacancies/top-vacancies.component';

export const routes: Routes = [
  { path: '', component: CompaniesListComponent },
  { path: 'companies/:id', component: CompanyDetailComponent },
  { path: 'top-vacancies', component: TopVacanciesComponent },
  { path: '**', redirectTo: '' }
];