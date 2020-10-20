from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.views.generic.base import TemplateView
from .tasks import do_send_question_mail


class Home(TemplateView):

    template_name = 'home/home.html'


def send_question_mail(request):
    do_send_question_mail.delay()
    return redirect('/')
