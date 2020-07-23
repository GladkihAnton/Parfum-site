import csv
import re

from django.http import HttpRequest, HttpResponse
from django.views.generic import DetailView

from Magazin_site import settings
from .models import Product, ConcentrationOfProduct, ProductImage


class ProductDetail(DetailView):
    model = Product
    template_name = 'products/product.html'


def upload_csv(request: HttpRequest):
    types = dict()
    types['edt'] = 'Туалетная вода'
    types['joy'] = 'Туалетная вода'
    types['edp'] = 'Парфюмерная вода'
    types['edc'] = 'Одеколон'
    types['lotion'] = 'Лосьон для тела'
    types['parfum'] = 'Духи'
    types['deo stick'] = 'Парфюмерный дезодорант'
    types['deo'] = 'Дезодорант-Спрей'
    types['after shave'] = 'Лосьон после бритья'
    types['gel'] = 'Гель для душа'
    path_to_file = settings.MEDIA_ROOT + '/file.csv'
    with open(path_to_file, 'wb+') as file:
        for chunk in request.FILES['file'].chunks():
            file.write(chunk)
    with open(path_to_file, 'r', encoding='utf-8', errors='ignore') as file:
        temp = csv.reader(file, delimiter=';')
        pattern = r'(\d+).'
        for row in temp:
            for kind in types.keys():
                if kind in row[2].lower():
                    product = Product()
                    image, created = ProductImage.objects.get_or_create()
                    type_of_product, created = ConcentrationOfProduct.objects.get_or_create(name=types[kind])
                    type_of_product.save(force_update=True)
                    product.type = type_of_product
                    product.name = row[2].replace(kind, '').replace('  ', ' ').replace('  ', ' ').replace('  ', ' ')
                    product.description = ''
                    product.cost = int(re.findall(pattern, row[3])[0])

                    product.save()
                    break
    return HttpResponse(202)
