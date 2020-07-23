from django.forms import Form, Field


class SearchForm(Form):
    name = Field(required=True)