clean:
	docker stop $$(docker ps -a -q) && \
	docker system prune -f && \
	docker volume prune -f && \
	docker network prune -f 
	# docker rmi -f $$(docker images -a -q) && \
	# docker image prune -f

all:
	docker-compose \
	-f docker-compose.controller.yml \
	-f docker-compose.database.yml \
	-f docker-compose.client.yml \
	up --build

svc:
	docker-compose -f docker-compose.services.yml up --build

be:
	docker-compose -f docker-compose.controller.yml up --build

fe:
	docker-compose -f docker-compose.client.yml up --build

db:
	docker-compose -f docker-compose.database.yml up --build

# for local dev
connect-db:
	docker exec -it postgres_db psql -U ideate_master -d ideate_db

exec-db:
	docker exec -it postgres_dev psql -U ideate_master -d ideate_db -c "$(query)"


# see logs individually
be-logs:
	docker-compose -f docker-compose.controller.yml logs -f

fe-logs:
	docker-compose -f docker-compose.client.yml logs -f

db-logs:
	docker-compose -f docker-compose.database.yml logs -f
