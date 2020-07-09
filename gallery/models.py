from django.db import models
from products.models import Product


class ProductInGallery(models.Model):
    product = models.ForeignKey(Product, blank=True, null=True, default=None, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "%s" % self.product.name  # ("Пользователь %s %s" % (self.email, seil.name)

    # Кастомизация множественного числа и единственного
    class Meta:
        verbose_name = "Товар в слайдере для галереи"
        verbose_name_plural = "Товары в слайдере для галереи"
