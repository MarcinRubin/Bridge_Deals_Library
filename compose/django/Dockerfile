FROM python:3.11.4-slim-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./backend/api/requirements.txt .
RUN pip install update && pip install --no-cache-dir -r requirements.txt

# Copy nad run entrypoint script to check if postgres container is up
COPY ./compose/django/entrypoint ./entrypoint
RUN sed -i -e 's/\r$//g' ./entrypoint
RUN chmod +x ./entrypoint

COPY ./compose/django/start ./start
RUN sed -i -e 's/\r$//g' ./start
RUN chmod +x ./start

COPY ./compose/django/celery/start ./start-celeryworker
RUN sed -i -e 's/\r$//g' ./start-celeryworker
RUN chmod +x ./start-celeryworker

WORKDIR /app

# COPY ./backend/api .

ENTRYPOINT ["/entrypoint"]
