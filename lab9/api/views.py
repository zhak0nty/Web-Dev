from django.urls import path
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from .models import Company, Vacancy
import json

@csrf_exempt
def list_companies(request):
    if request.method == "GET":        
        companies = list(Company.objects.values())
        return JsonResponse(companies, safe=False)

    if request.method == "POST":
        try:
            company_data = json.loads(request.body)
            company = Company.objects.create(**company_data)
            return JsonResponse({
                "id": company.id,
                "name": company.name,
                "description": company.description,
                "city": company.city,
                "address": company.address
            }, status=201)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

@csrf_exempt
def get_company(request, id):
    try:
        company = Company.objects.get(id=id)
    except Company.DoesNotExist:
        return JsonResponse({"message": "company not found"}, status=400)

    if request.method == "GET":
        return JsonResponse({
            "id": company.id,
            "name": company.name,
            "description": company.description,
            "city": company.city,
            "address": company.address
        })
    
    if request.method == "DELETE":
        company.delete()
        return JsonResponse({"message": "Company deleted successfully"}, status=204)

def list_vacancies_by_company(request, id):
    company = list(Company.objects.filter(id=id).values())   
    vacancies = list(Vacancy.objects.filter(company_id=id).values())
    return JsonResponse({"company": company, "vacancies": vacancies}, safe=False)

@csrf_exempt
def list_vacancies(request):
    if request.method == "GET":        
        vacancies = list(Vacancy.objects.values())
        return JsonResponse(vacancies, safe=False)

    if request.method == "POST":
        try:
            vacancy_data = json.loads(request.body)
            vacancy = Vacancy.objects.create(**vacancy_data)
            return JsonResponse({
                "id": vacancy.id,
                "name": vacancy.name,
                "description": vacancy.description,
                "salary": vacancy.salary,
                "company": vacancy.company.id
            }, status=201)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

def get_vacancy(request, id):
    try:
        vacancy = Vacancy.objects.get(id=id)
    except Vacancy.DoesNotExist:
        return JsonResponse({"message": "vacancy not found", "status": 400}, status=400)

    return JsonResponse({
        "id": vacancy.id,
        "name": vacancy.name,
        "description": vacancy.description,
        "salary": vacancy.salary,
        "company": vacancy.company.id
    })

def top_ten_vacancies(request):
    vacancies = list(Vacancy.objects.order_by('-salary')[:10].values())
    return JsonResponse(vacancies, safe=False)
