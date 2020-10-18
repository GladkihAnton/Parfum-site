from django.core.mail import send_mail

from Magazin_site.celery_app import app


@app.task(name="send_question_mail")
def do_send_question_mail(to, message):
    send_mail(
        'Диане',
        message,
        to,
        ['antohagladkih@gmail.com'],
        fail_silently=False,
    )
