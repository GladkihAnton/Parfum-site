FROM python:3.8

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY . /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["python", "manage.py", "makemigration"]
CMD ["python", "manage.py", "migrate"]
#CMD ["python", "manage.py", "runserver","0.0.0.0","8000"]
CMD python manage.py collectstatic
CMD python manage.py runserver 0.0.0.0:8000