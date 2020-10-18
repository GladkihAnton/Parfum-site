from django.http import JsonResponse, HttpResponse
from django.views.generic import ListView

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
        queryset = queryset_of_filtered_products(self.request.POST)
        return queryset

    def post(self, request, *args, **kwargs):
        return_dict = self.get_queryset()
        return JsonResponse(return_dict)
