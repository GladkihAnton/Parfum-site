from django.db import models


class VolumeOfProduct(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default=None)

    def __str__(self):
        return "%s" % self.name

    class Meta:
        verbose_name = "Объем"
        verbose_name_plural = "Объемы"


class ConcentrationOfProduct(models.Model):
    name = models.CharField(max_length=256, blank=True, null=True, default=None)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return "%s" % self.name

    class Meta:
        verbose_name = "Тип товара"
        verbose_name_plural = "Типы товаров"


class FragranceFamilyOfProduct(models.Model):
    name = models.CharField(max_length=256, blank=True, null=True, default=None)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return "%s" % self.name

    class Meta:
        verbose_name = "Семейство аромата"
        verbose_name_plural = "Семейство Ароматов"


class SexOfProduct(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default=None)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return "%s" % self.name

    class Meta:
        verbose_name = "Для кого"
        verbose_name_plural = "Для кого"


class MakerOfProduct(models.Model):
    name = models.CharField(max_length=256, blank=True, null=True, default=None)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return "%s" % self.name

    class Meta:
        verbose_name = "Производитель"
        verbose_name_plural = "Производители"


class Product(models.Model):
    name = models.CharField(max_length=256, blank=True, null=True, default=None)
    description = models.TextField(blank=True, null=True, default=None)
    maker = models.ForeignKey(MakerOfProduct, blank=True, null=True, default=None, on_delete=models.PROTECT)
    country = models.CharField(max_length=32, blank=True, null=True, default=None)
    year_of_release = models.PositiveSmallIntegerField(blank=True, null=True, default=None)
    fragrance_family = models.ManyToManyField(FragranceFamilyOfProduct)
    volume = models.ForeignKey(VolumeOfProduct, blank=True, null=True, default=None,
                                         on_delete=models.PROTECT)
    sex = models.ForeignKey(SexOfProduct, blank=True, null=True, default=None, on_delete=models.PROTECT)
    concentration = models.ForeignKey(ConcentrationOfProduct, blank=True, null=True, default=None,
                                      on_delete=models.PROTECT)
    cost = models.PositiveSmallIntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return "%s" % self.name

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, blank=True, null=True, default=None, on_delete=models.PROTECT)
    image = models.ImageField(upload_to='product_images/')
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return "%s" % self.image

    class Meta:
        verbose_name = "Фотография"
        verbose_name_plural = "Фотографии"
