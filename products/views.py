import logging

from django.http import JsonResponse
from django.views.generic import DetailView

from .models import Product, MakerOfProduct

logger = logging.getLogger('products')


class ProductDetail(DetailView):
    model = Product
    template_name = 'products/product.html'


def get_makers_and_perfumes(request):
    searched_name = request.GET.get('name')
    makers, perfumes = [], []

    for maker in MakerOfProduct.objects.filter(name__startswith=searched_name):
        makers.append({'name': maker.name, 'href': '/gallery?maker=' + maker.name})

    for perfume in Product.objects.filter(name__icontains=searched_name):
        try:
            perfumes.append({'name': perfume.name, 'sex': perfume.sex.name,
                             'img': '/media/' + str(perfume.productimage_set.all()[0]),
                             'href': '/perfumes/' + str(perfume.id)})
        except IndexError:
            perfumes.append({'name': perfume.name, 'sex': perfume.sex.name,
                             'img': '/static/img/No_foto.png',
                             'href': '/perfumes/' + str(perfume.id)})

    return JsonResponse({'makers': makers, 'perfumes': perfumes})
