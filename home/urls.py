from django.urls import path

from home import views
from products import views as v

urlpatterns = [
    path('', views.Home.as_view(), name='home'),
    path('upload_csv', v.upload_csv, name='upload_csv'),
    path('send_question_mail', views.send_question_mail, name='send_question_mail'),
]
