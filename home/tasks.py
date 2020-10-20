from django.core.mail import send_mail

from Magazin_site.celery_app import app


@app.task(name="send_question_mail")
def do_send_question_mail(mail, message):
    send_mail(
        'Диане',
        message,
        mail,
        ['antohagladkih@gmail.com'],
        fail_silently=False,
    )
