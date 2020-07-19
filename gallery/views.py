from django.shortcuts import render
from products.models import TypeOfProduct, Product
from django.db.models import QuerySet
from django.http import JsonResponse

import json


def gallery(request):
    type_of_products = TypeOfProduct.objects.all()
    products = Product.objects.all()
    return render(request, 'landing/gallery.html', locals())


def create_return_dict(products: QuerySet):
    return_dict = {}
    for item in products:
        try:
            return_dict[item.id] = [item.name, item.description, item.cost,
                                '/media/' + str(item.productimage_set.all()[0]), item.id]
        except IndexError:
            return_dict[item.id] = [item.name, item.description, item.cost,
                                    '/static/img/No_foto.png', item.id]
    return return_dict


def gallery_search_function(request):
    data = request.POST
    search = data.get("search")
    cancel = data.get("refresh")
    checkbox_list = json.loads(data.get("checkbox"))
    if cancel == 'False':
        products = Product.objects.filter(name__icontains=search, type__name__in=checkbox_list)[0:12]
    else:
        products = Product.objects.all()[0:12]
    return_dict = create_return_dict(products)
    return_dict['data'] = data.get("search")

    return JsonResponse(return_dict)


def gallery_checkbox(request):
    data = request.POST
    search = data.get("search")
    checkbox_list = json.loads(data.get("checkbox"))
    result_products = Product.objects.filter(name__icontains=search, type__name__in=checkbox_list)[0:12]
    return_dict = create_return_dict(result_products)
    return JsonResponse(return_dict)


def update_content(request):
    data = request.POST
    start = int(data.get("quantity"))
    search = data.get("search")
    checkbox_list = json.loads(data.get('checkbox'))
    products_on_page = Product.objects.filter(name__icontains=search, type__name__in=checkbox_list)[start-1:start+9]
    return_dict = create_return_dict(products_on_page)
    return JsonResponse(return_dict)
