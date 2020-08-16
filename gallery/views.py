from django.core.handlers.wsgi import WSGIRequest
from django.http import JsonResponse
from django.views.generic import ListView

from .business_logic import *
from .forms import FiltersForm, SearchCostForm


class GalleryDisplay(ListView):
    model = Product
    queryset = Product.objects.all()
    template_name = 'landing/gallery.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filter_form'] = FiltersForm
        context['search_cost_form'] = SearchCostForm
        return context


class GalleryAjaxFilter(ListView):
    def get_queryset(self):
        queryset = queryset_of_filtered_products(self.request.GET)
        return queryset

    def get(self, request, *args, **kwargs):
        return_dict = self.get_queryset()
        return JsonResponse(return_dict)


class GalleryAjaxUpdate(ListView):
    def get_queryset(self):
        queryset = queryset_of_filtered_products(self.request.GET)
        return queryset

    def get(self, request, *args, **kwargs):
        return_dict = self.get_queryset()
        return JsonResponse(return_dict)

# def gallery_update_content_ajax(request: WSGIRequest):
#     return_dict = dict_of_filtered_products(request.POST)
#     return JsonResponse(return_dict)
#
#
# def gallery_filter_ajax(request: WSGIRequest):
#     if request.is_ajax():
#         return_dict = dict_of_filtered_products(request.GET)
#     return JsonResponse(return_dict)
