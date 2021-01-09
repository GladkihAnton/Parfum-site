from django.http import JsonResponse, HttpResponse
from django.views.generic import ListView

from products.models import Product
from .business_logic import GalleryFilter
from .forms import FiltersForm, CostFilterForm


class GalleryDisplay(ListView):
    model = Product
    template_name = 'home/gallery.html'

    def get_queryset(self):
        maker = self.request.GET.get('maker')
        if maker:
            return Product.objects.filter(maker__name=maker)
        else:
            return Product.objects.all()

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filter_form'] = FiltersForm
        context['cost_filter_form'] = CostFilterForm
        return context


class GalleryUpdateContent(ListView):

    def post(self, request, *args, **kwargs):
        filtered_products = GalleryFilter.get_filtered_products(request.POST)

        return JsonResponse(filtered_products)
