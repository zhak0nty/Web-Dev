from django.urls import path
from .views import (
    company_list,
    company_detail,
    vacancy_list,
    vacancy_detail,
    vacancies_by_company,
    top_ten_vacancies,
)

urlpatterns = [
    path('companies/', company_list, name='company_list'),
    path('companies/<int:company_id>/', company_detail, name='company_detail'),
    path('companies/<int:company_id>/vacancies/', vacancies_by_company, name='vacancies_by_company'),
    path('vacancies/', vacancy_list, name='vacancy_list'),
    path('vacancies/<int:vacancy_id>/', vacancy_detail, name='vacancy_detail'),
    path('vacancies/top_ten/', top_ten_vacancies, name='top_ten_vacancies'),
]