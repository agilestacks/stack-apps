VIRTUALENV  := .venv
SOURCE_VENV := test -f $(VIRTUALENV)/bin/activate && source $(VIRTUALENV)/bin/activate
PIP         := $(SOURCE_VENV); pip3
PYLINT      := $(SOURCE_VENV); pylint
PYTEST      := $(SOURCE_VENV); pytest
PYTHON      := $(SOURCE_VENV); python3

$(VIRTUALENV):
	python3 -m venv $@
	$(PIP) install -U pip

install: $(VIRTUALENV)
	$(PIP) install -r requirements.txt --ignore-installed

lint: $(VIRTUALENV)
	$(PYLINT) api

pytest: $(VIRTUALENV)
	$(PYTEST) --junitxml=junit.xml

run: $(VIRTUALENV)
	$(PYTHON) app.py

clean:
	rm -rf $(VIRTUALENV)

.DEFAULT_GOAL: run
.PHONY: deploy flask pytest lint install
