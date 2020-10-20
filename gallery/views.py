from django.http import JsonResponse, HttpResponse
from django.views.generic import ListView
from django.core.mail import send_mail

from .business_logic import *
from .forms import FiltersForm, SearchCostForm


class GalleryDisplay(ListView):
    model = Product
    queryset = Product.objects.all()
    template_name = 'home/gallery.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filter_form'] = FiltersForm
        context['search_cost_form'] = SearchCostForm
        return context


class GalleryUpdateContent(ListView):
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
