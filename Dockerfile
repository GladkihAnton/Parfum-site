# BUILDER #
###########

# pull official base image
FROM python:3.8.3 as builder

# set work directory
WORKDIR /usr/src/parfumadmin

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update
RUN apt-get upgrade -y && apt-get -y install postgresql gcc python3-dev musl-dev
# install dependencies
RUN pip install --upgrade pip

COPY ./requirements.txt .
#RUN python -m pip install pip==19.3.1
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/parfumadmin/wheels -r requirements.txt


#########
# FINAL #
#########

# pull official base image
FROM python:3.8.3

# create directory for the app user
RUN mkdir -p /home/parfumadmin

# create the app user
RUN groupadd parfumeria
RUN useradd -m -g parfumeria parfumadmin
RUN usermod -aG parfumeria parfumadmin

# create the appropriate directories
ENV HOME=/home/parfumadmin
ENV APP_HOME=/home/parfumadmin/django
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
RUN mkdir $APP_HOME/media

# create the appropriate directories
WORKDIR $APP_HOME

RUN apt-get update && apt-get install -y netcat
# install dependencies
COPY --from=builder /usr/src/parfumadmin/wheels /wheels
COPY --from=builder /usr/src/parfumadmin/requirements.txt .
RUN pip install --no-cache /wheels/*

COPY ./entrypoint.sh $APP_HOME

# copy project
COPY . $APP_HOME

# chown all the files to the app user
RUN chown -R parfumadmin:parfumeria $APP_HOME

# change to the app user
USER parfumadmin

ENTRYPOINT ["/home/parfumadmin/django/entrypoint.sh"]