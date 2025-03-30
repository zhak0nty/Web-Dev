from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# from ..api.urls import urlpatterns as api_urls

urlpatterns = [
    path("", lambda request: JsonResponse({"ping": "pong"})),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]
