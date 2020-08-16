from django import forms
from products.models import MakerOfProduct, ConcentrationOfProduct, FragranceFamilyOfProduct


class MyMultiWidget(forms.widgets.MultiWidget):
    def __init__(self, attrs=None):
        _widgets = (
            forms.widgets.NumberInput(
                attrs={
                    'class': 'gallery_filter_cost_range_1',
                    'placeholder': 'От 500р',
                }
            ),
            forms.widgets.NumberInput(
                attrs={
                    'class': 'gallery_filter_cost_range_2',
                    'placeholder': 'До 10000р'
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
    checkboxes_concentrations = forms.ModelMultipleChoiceField(
        help_text='КОНЦЕНТРАЦИЯ',
        widget=forms.CheckboxSelectMultiple(
            attrs={
                'checked': 'true',
                'class': 'mt-2',
            }
        ),
        queryset=ConcentrationOfProduct.objects.all(),
        to_field_name='name'
    )

    checkboxes_makers = forms.ModelMultipleChoiceField(
        help_text='БРЕНД',
        widget=forms.CheckboxSelectMultiple(
            attrs={
                'checked': 'true',
                'class': 'mt-2',
            }
        ),
        queryset=MakerOfProduct.objects.all(),
        to_field_name='name'
    )

    checkboxes_fragrances = forms.ModelMultipleChoiceField(
        help_text='НОТЫ АРОМАТА',
        widget=forms.CheckboxSelectMultiple(
            attrs={
                'checked': 'true',
                'class': 'mt-2',
            }
        ),
        queryset=FragranceFamilyOfProduct.objects.all(),
        to_field_name='name'
    )

    SEX_CHOICES = [
        ('Мужской', 'Мужской'),
        ('Женский', 'Женский'),
    ]
    checkboxes_sex = forms.MultipleChoiceField(
        help_text='ПОЛ',
        required=False,
        widget=forms.CheckboxSelectMultiple(
            attrs={
                'checked': 'true',
                'class': 'mt-2'
            }
        ),
        choices=SEX_CHOICES,
    )


class SearchCostForm(forms.Form):
    search = forms.CharField(required=False, widget=forms.TextInput(
        attrs={
            'class': 'gallery_filter_search_input',
            'value': '',
            'placeholder': 'Поиск ароматов',
            'autofocus': 'true',
        }
    ))
    cost_range = MyMultiValueField()


