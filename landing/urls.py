from django.urls import path

from landing import views
from products import views as v

urlpatterns = [
    path('', views.home, name='home'),
    path('upload_csv', v.upload_csv, name='upload_csv')
]