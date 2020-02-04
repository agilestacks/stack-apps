VIRTUALENV := .venv
PYTHON     := python3
PIP        := source $(VIRTUALENV)/bin/activate; pip3
PYLINT     := source $(VIRTUALENV)/bin/activate; pylint
PYTEST     := source $(VIRTUALENV)/bin/activate; pytest
FLASK      := source $(VIRTUALENV)/bin/activate; flask

$(VIRTUALENV):
	$(PYTHON) -m venv $(abspath $@)

install: $(VIRTUALENV)
	$(PIP) install -r requirements.txt

lint: $(VIRTUALENV)
	$(PYLINT) api

pytest: $(VIRTUALENV)
	$(PYTEST) --junitxml=junit.xml

flask: $(VIRTUALENV)
	$(FLASK) run --port=5000

deploy: install flask

.DEFAULT_GOAL := deploy
.PHONY := deploy flask pytest lint install 
