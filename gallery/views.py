from django.shortcuts import render
from products.models import ProductImage, TypeOfProduct, Product
from django.db.models import Q
from django.http import JsonResponse
from gallery.models import ProductInGallery


def gallery(request):
    typeOfProducts = TypeOfProduct.objects.all()
    start_function(request)
    ProductsInGallery = ProductInGallery.objects.all()
    for product in ProductsInGallery:
        product.is_active = True
        product.save(force_update=True)
    return render(request, 'landing/gallery.html', locals())


def start_function(request):
    if not request.session.exists(request.session.session_key):
        request.session.create()
    session_key = request.session.session_key
    products = Product.objects.all()
    for product in products:
        new_product, created = ProductInGallery.objects.get_or_create(session_key=session_key,
            product=product)
    pass


def gallery_function(request):
    return_dict = dict()
    session_key = request.session.session_key
    data = request.POST
    search = data.get("search")
    cancel = data.get("refresh")
    if (cancel=='False'):
        products = ProductInGallery.objects.filter(Q(product__name__icontains=search, is_active=True) |
                                                 Q(product__description__icontains=search, is_active=True))[0:12]
    else:
        products = ProductInGallery.objects.all()[0:12]
    return_dict['data'] = data.get("search")
    for item in products:
        item.is_active = True
        item.save(force_update=True)
        return_dict[item.id] = [item.product.name, item.product.description, item.product.cost,
                                '/media/' + str(item.product.productimage_set.all()[0]), item.id]
    return JsonResponse(return_dict)


def gallery_checkbox(request):
    return_dict = dict()
    session_key = request.session.session_key
    data = request.POST
    search = data.get("search")
    checkbox = data.get("checkbox")
    status = data.get("status")
    if status == 'false':
        filtering_product = ProductInGallery.objects.filter(
            Q(product__name__icontains=search, product__type__name=checkbox) |
                Q(product__description__icontains=search, product__type__name=checkbox))
        for item in filtering_product:
            item.is_active = False
            item.save(force_update=True)
    else:
        filtering_product = ProductInGallery.objects.filter(
            Q(product__name__icontains=search, product__type__name=checkbox) |
            Q(product__description__icontains=search, product__type__name=checkbox))
        for item in filtering_product:
            item.is_active = True
            item.save(force_update=True)

    result_products = ProductInGallery.objects.filter(
        Q(product__name__icontains=search, is_active=True) |
        Q(product__description__icontains=search, is_active=True))[0:12]
    for item in result_products:
        return_dict[item.id] = [item.product.name, item.product.description, item.product.cost,
                                '/media/' + str(item.product.productimage_set.all()[0]), item.id]
    return JsonResponse(return_dict)


def update_content(request):
    return_dict = dict()
    session_key = request.session.session_key
    data = request.POST
    start = int(data.get("quantity"))
    search = data.get("search")
    products_on_page = ProductInGallery.objects.filter(Q(product__name__icontains=search, is_active=True) |
                                       Q(product__description__icontains=search, is_active=True))[start-1:start+9]
    for item in products_on_page:
        return_dict[item.id] = [item.product.name, item.product.description, item.product.cost,
                                '/media/' + str(item.product.productimage_set.all()[0]), item.id]
    return JsonResponse(return_dict)