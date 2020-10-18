import csv
import logging
import re

from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.generic import DetailView

from Magazin_site import settings
from .models import Product, ConcentrationOfProduct, ProductImage, MakerOfProduct, VolumeOfProduct, \
    FragranceFamilyOfProduct, SexOfProduct

logger = logging.getLogger('products')

class ProductDetail(DetailView):
    model = Product
    template_name = 'products/product.html'


def upload_csv(request: HttpRequest):
    logger.debug('start saving')
    path_to_file = settings.MEDIA_ROOT + '/file.csv'
    with open(path_to_file, 'wb+') as file1:
        temp = request.FILES['file']
        for chunk in temp.chunks():
            file1.write(chunk)
        logger.debug('finish saving')
        with open(path_to_file) as file2:
            opened_file = csv.reader(file2, delimiter=';', quotechar='"')
            for index, item in enumerate(opened_file):
                if index == 0:
                    continue
                logger.debug(index)
                maker_to_add, created = MakerOfProduct.objects.get_or_create(name=item[1].strip())
                logger.debug(maker_to_add)

                concentration_to_add, created = ConcentrationOfProduct.objects.get_or_create(name=item[3].strip())
                logger.debug(concentration_to_add)

                volume_to_add, created = VolumeOfProduct.objects.get_or_create(name=item[5].strip().capitalize())
                logger.debug(volume_to_add)
                sex_to_add, created = SexOfProduct.objects.get_or_create(name=item[4].strip().capitalize())
                logger.debug(sex_to_add)

                costs_to_add = int(item[7].strip())
                logger.debug(costs_to_add)

                product = Product()
                logger.debug('done')

                product.name = item[2].strip()
                product.maker = maker_to_add
                product.volume = volume_to_add

                product.concentration = concentration_to_add
                product.sex = sex_to_add

                product.cost = costs_to_add
                product.save()

    return JsonResponse({})
