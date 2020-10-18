from .forms import SearchForm


def search_form_in_navbar(request):
    search_form = SearchForm
    return locals()
