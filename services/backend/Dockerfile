ARG REGISTRY=python:3.10.0-buster
FROM $REGISTRY
WORKDIR /app

ARG PORT="8000"
ENV PORT=$PORT

ARG ENV="dev"

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "api.server.main:app", "--host", "0.0.0.0", "--port", "${PORT}", "--reload"]
