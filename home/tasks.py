from django.core.mail import send_mail

from Magazin_site.celery_app import app


@app.task(name="send_question_mail")
def do_send_question_mail():
    send_mail(
        'Диане',
        'Отправлено через сайт',
        'antohagladkih@gmail.com',
        ['antoha_19988@mail.ru'],
        fail_silently=False,
    )
