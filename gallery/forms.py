from django import forms
from products.models import MakerOfProduct, ConcentrationOfProduct, FragranceFamilyOfProduct


class MyMultiWidget(forms.widgets.MultiWidget):
    def __init__(self, attrs=None):
        _widgets = (
            forms.widgets.NumberInput(
                attrs={
                    'style': 'display:inline; width: 40%; margin-right: 2rem',
                    'placeholder': 'От 500р',
                }
            ),
            forms.widgets.NumberInput(
                attrs={
                    'style': 'display:inline; width: 40%',
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
    search = forms.CharField(required=False, widget=forms.TextInput(
        attrs={
            'class': 'gallery_search_input',
            'value': '',
            'placeholder': 'Search',
            'autofocus': 'true',
        }
    ))
    checkboxes_concentrations = forms.ModelMultipleChoiceField(
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
        required=False,
        widget=forms.CheckboxSelectMultiple(
            attrs={
                'checked': 'true',
                'class': 'mt-2'
            }
        ),
        choices=SEX_CHOICES,
    )
    cost_range = MyMultiValueField()


