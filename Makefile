setup-venv:
	python3 -m venv src/backend/venv/ideate
	poetry env use $(realpath src/backend/venv/ideate/bin/python)
	poetry install
	poetry shell
