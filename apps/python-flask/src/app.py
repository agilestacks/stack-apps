#!/usr/bin/env python
from flask import Response, Flask, render_template, request
from flask_json import json_response
from uptime import uptime
from random import sample
from os import environ

application = Flask(__name__)
application.config.from_pyfile(f"conf/{application.config['ENV']}.py")

# Remote debug settings
# We can debug debug or code reload: cannot do both
# Reload controlled as environment variable
if application.config["PTVSD_PORT"] \
    and int(environ.get("FLASK_RUN_RELOAD", 0)) == 0  \
    and application.debug:

    import ptvsd
    ptvsd.enable_attach(address=('0.0.0.0', application.config["PTVSD_PORT"]))

WORDS = [
    "skaffold", "flask", "ptvs", "vscode"
]

def get_words(howmany=1):
    """
    returns list of random words
    """
    return sample(WORDS, howmany)


@application.route('/')
def index():
    """
    return the rendered index.html template
    """
    return render_template("index.html", words=get_words(3))


@application.route("/gimme")
@application.route("/gimme/<int:howmany>")
def gimme(howmany=1):
    """
    returns random list of words with the size defined in parameter howmany
    """
    return json_response(data=get_words(howmany))


@application.route('/status')
def status():
    """
    returns healthcheck and uptime
    """
    return json_response(
        200,
        status="ok",
        uptime=uptime(),
    )


if __name__ == "__main__":
    application.run(
      host=application.config.get('HOST'),
      port=application.config.get('PORT')
    )
