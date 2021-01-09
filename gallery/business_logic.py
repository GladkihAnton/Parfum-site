from typing import Optional

from django.db.models.query import QuerySet
from django.http import QueryDict

from products.models import Product


class GalleryFilter:
    KEY_TO_FILTER_NAME: dict = {
        'checkboxes_makers': 'maker__name__in',
        'checkboxes_concentrations': 'concentration__name__in',
        'checkboxes_sex': 'sex__name__in',
        'checkboxes_fragrances': 'fragrance_family__name__in',
        'min_cost': 'cost__gte',
        'max_cost': 'cost__lte',
    }

    EXPECTED_LIST_ARGS: list = ['checkboxes_makers', 'checkboxes_concentrations',
                                'checkboxes_sex', 'checkboxes_fragrances']

    EXPECTED_NON_LIST_ARGS: list = ['min_cost', 'max_cost']

    @staticmethod
    def get_filtered_products(data: QueryDict) -> dict:
        error: str = GalleryFilter._check_data_on_error(data)
        if error:
            return {'error': error}

        filters: dict = GalleryFilter._prepare_filters(data)

        cards_on_page: int = int(data.get("cardsOnPage", 0))

        products_on_page: QuerySet = Product.objects.filter(**filters).distinct()[cards_on_page:cards_on_page + 12]

        return GalleryFilter._to_dict(products_on_page)

    @staticmethod
    def _prepare_filters(data: QueryDict) -> dict:
        filters: dict = {}

        for key in data.keys():
            if key in GalleryFilter.EXPECTED_LIST_ARGS and data.getlist(key):
                filters[GalleryFilter.KEY_TO_FILTER_NAME[key]] = data.getlist(key)
            elif key in GalleryFilter.EXPECTED_NON_LIST_ARGS:
                filters[GalleryFilter.KEY_TO_FILTER_NAME[key]] = data.get(key)

        return filters

    @staticmethod
    def _to_dict(products: QuerySet) -> dict:
        result_dict: dict = {}
        for item in products:
            img_url = '/media/' + str(item.productimage_set.all()[0]) if item.productimage_set.all() \
                else '/static/img/No_foto.png'

            result_dict[item.id] = {
                'id': item.id,
                'name': item.name,
                'cost': item.cost,
                'img_url': img_url
            }

        return result_dict

    @staticmethod
    def _check_data_on_error(data) -> Optional[str]:
        try:
            int(data.get('cardsOnPage', 0))
            int(data.get('min_cost', 0))
            int(data.get('max_cost', 0))
        except ValueError:
            return 'wrong_data'

        if not isinstance(data.getlist('checkboxes_makers', []), list):
            return 'wrong_data'

        if not isinstance(data.getlist('checkboxes_concentrations', []), list):
            return 'wrong_data'

        if not isinstance(data.getlist('checkboxes_sex', []), list):
            return 'wrong_data'

        if not isinstance(data.getlist('checkboxes_fragrances'), list):
            return 'wrong_data'