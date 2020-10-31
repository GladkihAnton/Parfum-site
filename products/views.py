import csv
import re

from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.generic import DetailView

from Magazin_site import settings
from .models import Product, ConcentrationOfProduct, ProductImage, MakerOfProduct, VolumeOfProduct, \
    FragranceFamilyOfProduct, SexOfProduct


class ProductDetail(DetailView):
    model = Product
    template_name = 'products/product.html'


def upload_csv(request: HttpRequest):
    path_to_file = settings.MEDIA_ROOT + '/file.csv'
    with open(path_to_file, 'wb+') as file:
        for chunk in request.FILES['file'].chunks():
            file.write(chunk)

        with open(path_to_file) as file1:
            opened_file = csv.reader(file1, delimiter=';', quotechar='"')
            for index, item in enumerate(opened_file):
                if index == 0:
                    continue

                volumes_to_add = []
                fragrances_to_add = []

                maker_to_add, created = MakerOfProduct.objects.get_or_create(name=item[0].strip())

                concentration_to_add, created = ConcentrationOfProduct.objects.get_or_create(name=item[1].strip())

                volumes = [x.strip() for x in item[3].split(',')]
                for volume_name in volumes:
                    volume_to_add, created = VolumeOfProduct.objects.get_or_create(name=volume_name)
                    volumes_to_add.append(volume_to_add)

                fragrances = [x.strip().capitalize() for x in item[4].split(',')]
                for fragrance_name in fragrances:
                    fragrance_to_add, created = FragranceFamilyOfProduct.objects.get_or_create(name=fragrance_name)
                    fragrances_to_add.append(fragrance_to_add)

                sex_to_add, created = SexOfProduct.objects.get_or_create(name=item[5].strip().capitalize())

                costs_to_add = [int(cost.strip()) for cost in item[6].split(',')]

                for volume, cost in zip(volumes_to_add, costs_to_add):
                    product = Product()

                    product.name = item[1].strip()
                    product.maker = maker_to_add
                    product.volume = volume

                    product.concentration = concentration_to_add
                    product.sex = sex_to_add

                    product.cost = cost
                    product.save()

                    for fragrance in fragrances_to_add:
                        product.fragrance_family.add(fragrance)

    return JsonResponse({})
