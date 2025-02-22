clean:
	docker stop $$(docker ps -a -q) && \
	docker system prune -f && \
	docker volume prune -f

be:
	docker-compose -f docker-compose.backend.yml up --build

fe:
	docker-compose -f docker-compose.frontend.yml up --build

db:
	docker-compose -f docker-compose.database.yml up --build
