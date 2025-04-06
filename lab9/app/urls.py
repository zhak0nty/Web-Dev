
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path

urlpatterns = [
    path('api/', include('api.urls')),
    path('', lambda request: JsonResponse({"ping": "pong"})),
    path('admin/', admin.site.urls),
]

