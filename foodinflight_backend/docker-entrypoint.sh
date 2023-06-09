#!/bin/sh

python manage.py makemigrations
python manage.py migrate
python manage.py migrate --run-syncdb
python manage.py collectstatic --noinput
uwsgi --ini uwsgi.ini
