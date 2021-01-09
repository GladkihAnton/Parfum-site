from django import forms
from django.forms import NumberInput

from products.models import MakerOfProduct, ConcentrationOfProduct, FragranceFamilyOfProduct, SexOfProduct


class MyMultiWidget(forms.widgets.MultiWidget):
    def __init__(self, attrs=None):
        _widgets = (
            forms.widgets.NumberInput(
                attrs={
                    'class': 'gallery_filter_cost_range_1',
                    'placeholder': 'От 500р',
                    'value': '',
                },
            ),
            forms.widgets.NumberInput(
                attrs={
                    'class': 'gallery_filter_cost_range_2',
                    'placeholder': 'До 10000р',
                    'value': ''
                }
            ),
        )
        super(MyMultiWidget, self).__init__(_widgets, attrs)

    def decompress(self, value):
        return [None, None]


class MyMultiValueField(forms.MultiValueField):
    widget = MyMultiWidget

    def __init__(self, *args, **kwargs):
        fields = (
            forms.IntegerField(),
            forms.IntegerField(),
        )
        super(MyMultiValueField, self).__init__(
            require_all_fields=False, required=False, fields=fields, *args, **kwargs)

    def compress(self, data_list):
        return data_list


class FiltersForm(forms.Form):
    checkboxes_makers = forms.ModelMultipleChoiceField(
        help_text='БРЕНД',
        widget=forms.CheckboxSelectMultiple(
            attrs={
                'class': 'mt-2',
            }
        ),
        queryset=MakerOfProduct.objects.all(),
        to_field_name='name'
    )

    maker_search = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                'class': 'gallery_filter_maker_search',
                'value': '',
                'placeholder': 'Поиск по брендам...',
            }
        ))

    checkboxes_concentrations = forms.ModelMultipleChoiceField(
        help_text='КОНЦЕНТРАЦИЯ',
        widget=forms.CheckboxSelectMultiple(
            attrs={
                'class': 'mt-2',
            }
        ),
        queryset=ConcentrationOfProduct.objects.all(),
        to_field_name='name'
    )

    checkboxes_fragrances = forms.ModelMultipleChoiceField(
        help_text='НОТЫ АРОМАТА',
        widget=forms.CheckboxSelectMultiple(
            attrs={
                'class': 'mt-2',
            }
        ),
        queryset=FragranceFamilyOfProduct.objects.all(),
        to_field_name='name'
    )

    checkboxes_sex = forms.ModelMultipleChoiceField(
        help_text='ПОЛ',
        widget=forms.CheckboxSelectMultiple(
            attrs={
                'class': 'mt-2',
            }
        ),
        queryset=SexOfProduct.objects.all(),
        to_field_name='name'
    )


class CostFilterForm(forms.Form):

    cost_filter = MyMultiValueField()
