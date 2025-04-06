from django.db import models

'''
name - CharField
description - TextField
city - CharField
address - TextField

'''

class Company(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    city = models.CharField(max_length=100)
    address = models.TextField()
    

'''
name - CharField
description - TextField
salary - FloatField
company - ForeignKey

'''

class Vacancy(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True)
    salary = models.FloatField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE)