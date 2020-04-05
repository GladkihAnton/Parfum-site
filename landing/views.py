from django.shortcuts import render

from products.models import ProductImage


def home(request):
    productsImages = ProductImage.objects.all()
    return render(request, 'landing/home.html', locals())
