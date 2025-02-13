#!/bin/bash

export PYTHONPATH=$PYTHONPATH:$(realpath .)
poetry run uvicorn src.main:app --reload
