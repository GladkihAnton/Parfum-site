from django.shortcuts import render

from gallery.models import ProductInGallery
from products.forms import ImportCsv

def home(request):
    form = ImportCsv
    products_in_slider = ProductInGallery.objects.all()
    return render(request, 'landing/home.html', locals())


