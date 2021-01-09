from django.urls import path

from home import views

urlpatterns = [
    path('', views.Home.as_view(), name='home'),
    path('send_question_mail', views.send_question_mail, name='send_question_mail'),
]
