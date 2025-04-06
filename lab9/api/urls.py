from django.urls import path
from django.http import JsonResponse
from .views import (
    list_companies,
    get_company,
    list_vacancies_by_company,
    list_vacancies,
    get_vacancy,
    top_ten_vacancies
)

urlpatterns = [
    path('companies/', list_companies), 
    path('companies/<int:id>/', get_company),
    path('companies/<int:id>/vacancies/', list_vacancies_by_company),
    path('vacancies/', list_vacancies),
    path('vacancies/<int:id>/', get_vacancy),
    path('vacancies/top_ten/', top_ten_vacancies),
]
