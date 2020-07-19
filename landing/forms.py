from django.forms import forms, Form


class SearchForm(Form):
    name = forms.Field(required=True)