clean:
	find . -regex ".*/__pychache__" -exec rm -rf {} \;
	find . -regex ".*/.pytest_cache" -exec rm -rf {} \;


VERSION=develop
TAG=ideate-be:$(VERSION)
# REGISTRY=""


setup-poetry:
	# python3 -m venv .venv/ideate
	# poetry env use $(realpath .venv/ideate/bin/python3.10)
	poetry install

start-poetry:
	poetry shell

run:
	. run.sh


# docker
image-local:
	docker build --build-arg REGISTRY=python:3.10 -t $(TAG) .

