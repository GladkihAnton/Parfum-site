from django.urls import path

from .views import ProductDetail, get_makers_and_perfumes

urlpatterns = [
    path('perfumes/<int:pk>/', ProductDetail.as_view(), name='product'),
    path('get_makers_and_perfumes', get_makers_and_perfumes, name='get_makers_and_perfumes'),
]
