from django.shortcuts import render

from gallery.models import ProductInGallery
from products.forms import ImportCsv
from .forms import SearchForm


def home(request):
    form = ImportCsv
    # search_form = SearchForm
    products_in_slider = ProductInGallery.objects.all()
    return render(request, 'landing/home.html', locals())

# def home_search(request, name):
