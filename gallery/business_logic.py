import json

from django.db.models.query import QuerySet
from django.http import QueryDict

from products.models import Product


def create_return_dict(products: QuerySet):
    return_dict = {}
    for item in products:
        try:
            return_dict[item.id] = {'name': item.name, 'cost': item.cost, 'image':
                                '/media/' + str(item.productimage_set.all()[0]), 'id': item.id}
        except IndexError:
            return_dict[item.id] = {'name': item.name, 'cost': item.cost,
                                    'image': '/static/img/No_foto.png', 'id': item.id}
    return return_dict


def queryset_of_filtered_products(data: QueryDict):
    try:
        start = int(data.get("quantity"))-1
    except TypeError:
        start = 0

    search = data.get("search")
    checkboxes_makers_list = data.getlist('checkboxes_makers')
    checkboxes_concentrations_list = data.getlist('checkboxes_concentrations')
    checkboxes_sex_list = data.getlist('checkboxes_sex')
    checkboxes_fragrances_list = data.getlist('checkboxes_fragrances')
    min_cost, max_cost = data.get('cost_range_0'), data.get('cost_range_1')
    print(search)
    print(checkboxes_concentrations_list)
    print(checkboxes_makers_list)
    print(checkboxes_fragrances_list)
    print(checkboxes_sex_list)
    print(start)
    if min_cost == '':
        min_cost = 0
    if max_cost == '':
        max_cost = 100000
    cost_range = (min_cost, max_cost)
    print(cost_range)
    products_on_page = Product.objects.filter(name__icontains=search,
                                              concentration__name__in=checkboxes_concentrations_list,
                                              maker__name__in=checkboxes_makers_list,
                                              fragrance_family__name__in=checkboxes_fragrances_list,
                                              sex__in=checkboxes_sex_list,
                                              cost__range=cost_range)[start:start+12]
    print(products_on_page)
    return_dict = create_return_dict(products_on_page)
    return return_dict
