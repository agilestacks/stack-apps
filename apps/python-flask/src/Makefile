VIRTUALENV  := .venv
SOURCE_VENV := test -f $(VIRTUALENV)/bin/activate && source $(VIRTUALENV)/bin/activate
PIP         := $(SOURCE_VENV); pip3
PYLINT      := $(SOURCE_VENV); pylint
PYTEST      := $(SOURCE_VENV); pytest
PYTHON      := $(SOURCE_VENV); python3

$(VIRTUALENV):
	$(PYTHON) -m venv $(abspath $@)

install: $(VIRTUALENV)
	$(PIP) install -r requirements.txt

lint: $(VIRTUALENV)
	$(PYLINT) api

pytest: $(VIRTUALENV)
	$(PYTEST) --junitxml=junit.xml

run: $(VIRTUALENV)
	$(PYTHON) app.py

deploy: install run

clean:
	rm -rf $(VIRTUALENV)

.DEFAULT_GOAL := deploy
.PHONY := deploy flask pytest lint install 
