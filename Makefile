run-be:
	@trap 'docker-compose -f docker-compose.ideate-be.yml down' EXIT; \
	docker-compose -f docker-compose.ideate-be.yml up --build
