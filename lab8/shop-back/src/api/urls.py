from django.urls import path
from django.http import JsonResponse

from .views import (
    product,
    category,
    product_list,
    categories_list,
    find_product_by_category_id,
)

urlpatterns = [
    path("", lambda request: JsonResponse(data={"data": "this is api root"})),
    path("products/", product_list, name="product-list"),
    path("products/<int:product_id>/", product, name="product-by-id"),
    path("categories/", categories_list, name="category-list"),
    path("categories/<int:category_id>/", category, name="category-by-id"),
    path(
        "categories/<int:category_id>/products/",
        find_product_by_category_id,
        name="category-by-id",
    ),
]
