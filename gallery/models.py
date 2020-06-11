from django.db import models
from products.models import Product


class ProductInGallery(models.Model):
    session_key = models.CharField(max_length=128, blank=True, null=True, default=None)
    product = models.ForeignKey(Product, blank=True, null=True, default=None, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "%s" % self.product.name  # ("Пользователь %s %s" % (self.email, seil.name)

    # Кастомизация множественного числа и единственного
    class Meta:
        verbose_name = "Товар в галерее"
        verbose_name_plural = "Товары в галерее"
    # def save(self, *args, **kwargs):
    #     price_per_item = self.product.cost
    #     self.price_per_item = price_per_item
    #     self.total_price = int(self.nmb) * price_per_item
    #     # super(ProductInBasket, self).save(*args, **kwargs)
