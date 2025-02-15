clean:
	docker stop $(duso docker ps -a -q) && \
	docker system prune -f && \
	docker volume prune -f

run-be:
	@trap 'docker-compose -f docker-compose.backend.yml down' EXIT; \
	docker-compose -f docker-compose.backend.yml up --build

run-fe:
	@trap 'docker-compose -f docker-compose.frontend.yml down' EXIT; \
	docker-compose -f docker-compose.frontend.yml up --build

