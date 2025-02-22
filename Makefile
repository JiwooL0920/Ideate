clean:
	docker stop $$(docker ps -a -q) && \
	docker system prune -f && \
	docker volume prune -f

all:
	docker-compose \
	-f docker-compose.backend.yml \
	-f docker-compose.database.yml \
	up --build

be:
	docker-compose -f docker-compose.backend.yml up --build

fe:
	docker-compose -f docker-compose.frontend.yml up --build

db:
	docker-compose -f docker-compose.database.yml up --build

# local dev
connect-db:
	docker exec -it postgres_dev psql -U ideate_master -d ideate_db

exec-db:
	docker exec -it postgres_dev psql -U ideate_master -d ideate_db -c "$(query)"
