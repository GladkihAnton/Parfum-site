import csv
from django.forms import Form, forms


class ImportCsv(Form):
    file = forms.FileField(required=True)


        