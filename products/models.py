from django.db import models

class TypeOfProduct(models.Model):
    name = models.CharField(max_length=32, blank=True, null=True, default=None)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)
    def __str__(self):
        return "%s" % self.name
    class Meta:
        verbose_name="Тип товара"
        verbose_name_plural="Типы товаров"

class Product(models.Model):
    name = models.CharField(max_length=32, blank=True, null=True, default=None)
    description = models.TextField(blank=True, null=True, default=None)
    type = models.ForeignKey(TypeOfProduct, blank=True, null=True, default=None, on_delete=models.PROTECT)
    cost = models.PositiveSmallIntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)
    #Кастомизация админки
    def __str__(self):
        return "%s" % self.name# ("Пользователь %s %s" % (self.email, seil.name)
    #Кастомизация множественного числа и единственного
    class Meta:
        verbose_name="Товар"
        verbose_name_plural="Товары"


class ProductImage(models.Model):
    product= models.ForeignKey(Product, blank=True, null=True, default=None, on_delete=models.PROTECT)
    image = models.ImageField(upload_to='product_images/')
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)
    def __str__(self):
        return "%s" % self.image # ("Пользователь %s %s" % (self.email, seil.name)
    # Кастомизация множественного числа и единственного
    class Meta:
        verbose_name="Фотография"
        verbose_name_plural="Фотографии"