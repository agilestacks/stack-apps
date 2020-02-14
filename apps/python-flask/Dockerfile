FROM python:3.7

ENV PTVSD_PORT        3000

ENV FLASK_APP         app.py
ENV FLASK_ENV         docker
ENV FLASK_DEBUG       1
ENV FLASK_RUN_HOST    0.0.0.0
ENV FLASK_RUN_PORT    80
ENV FLASK_RUN_RELOAD  1

WORKDIR /app
COPY src/ .

RUN pip install --upgrade pip
RUN pip install \
   --compile \
   --no-cache-dir \
   --trusted-host pypi.python.org \
   -r requirements.txt

EXPOSE ${FLASK_RUN_PORT}
EXPOSE ${PTVSD_PORT}

CMD ["python3", "-m", "flask", "run"]
