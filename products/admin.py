from django.contrib import admin

from .models import Product, ProductImage, ConcentrationOfProduct, FragranceFamilyOfProduct, MakerOfProduct, VolumeOfProduct


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 0


@admin.register(VolumeOfProduct)
class VolumeOfProductAdmin(admin.ModelAdmin):
    list_display = [field.name for field in VolumeOfProduct._meta.fields]

    class Meta:
        model = VolumeOfProduct


@admin.register(ConcentrationOfProduct)
class ConcentrationOfProductAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ConcentrationOfProduct._meta.fields]

    class Meta:
        model = ConcentrationOfProduct


@admin.register(FragranceFamilyOfProduct)
class ProductAdmin(admin.ModelAdmin):
    list_display = [field.name for field in FragranceFamilyOfProduct._meta.fields]

    class Meta:
        model = FragranceFamilyOfProduct


@admin.register(MakerOfProduct)
class ProductAdmin(admin.ModelAdmin):
    list_display = [field.name for field in MakerOfProduct._meta.fields]

    class Meta:
        model = MakerOfProduct


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Product._meta.fields]
    inlines = [ProductImageInline]

    class Meta:
        model = Product


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ProductImage._meta.fields]

    class Meta:
        model = ProductImage
