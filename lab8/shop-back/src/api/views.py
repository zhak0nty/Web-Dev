from django.http import JsonResponse, request
from .models import Product, Category

def product_list(request: request) -> JsonResponse:
    try:
        products = list(Product.objects.values())
        return JsonResponse(data=products, status=200, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def categories_list(request: request) -> JsonResponse:
    try:
        categories = list(Category.objects.values())
        return JsonResponse(data=categories, status=200, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def product(request: request, product_id: int) -> JsonResponse:
    try:
        product = Product.objects.get(id=product_id)

        if product:
            return JsonResponse(data=Product, status=200, safe=False)
        else:
            return JsonResponse(data="Product not found", status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def category(request: request, category_id: int) -> JsonResponse:
    try:
        category = Category.objects.get(id=category_id)

        if category:
            return JsonResponse(data=Product, status=200, safe=False)
        else:
            return JsonResponse(data="Product not found", status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def find_product_by_category_id(self, category_id):
    try:
        products = Product.objects.filter(category_id=category_id)
        return list(products.values())
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
