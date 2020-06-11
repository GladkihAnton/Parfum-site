from django.contrib import admin
from .models import ProductInGallery

class ProductInGalleryAdmin (admin.ModelAdmin):
    list_display = [field.name for field in ProductInGallery._meta.fields]
    class Meta:
        model = ProductInGallery
admin.site.register(ProductInGallery, ProductInGalleryAdmin)