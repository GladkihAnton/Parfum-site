from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.http import JsonResponse, HttpResponse
from django.views.generic.base import TemplateView
from .tasks import do_send_question_mail


class Home(TemplateView):

    template_name = 'home/home.html'


def send_question_mail(request):
    if request.method == 'POST':
        user_mail = request.POST.get('user_mail')
        try:
            validate_email(user_mail)
            user_message = request.POST.get('user_message')
            do_send_question_mail(user_mail, user_message) #temp
            print(user_message)
        except ValidationError:
            print('bad')
        return HttpResponse(200)
    print('asdas')
    return HttpResponse(200)
