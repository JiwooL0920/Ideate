ARG REGISTRY=python:3.10.0-buster
FROM $REGISTRY

# Set the working directory
WORKDIR /app

# Install system dependencies for Poetry
RUN pip install --no-cache-dir poetry

# Copy the pyproject.toml and poetry.lock first to leverage Docker cache
COPY pyproject.toml poetry.lock ./

# Install dependencies using Poetry
RUN poetry config virtualenvs.create false && poetry install --no-root --no-interaction --no-ansi

# Copy the rest of the application code
COPY . .

# Set environment variables
ARG PORT="8000"
ENV PORT=$PORT

ARG ENV="dev"

# Command to run the application
CMD ["poetry", "run", "uvicorn", "api.server.main:app", "--host", "0.0.0.0", "--port", "${PORT}", "--reload"]

