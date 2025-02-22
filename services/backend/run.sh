#!/bin/bash

export PYTHONPATH=$PYTHONPATH:$(realpath .)
poetry run uvicorn api.server.main:app --reload
