import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Magazin_site.settings')

app = Celery('send_question_mail')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
