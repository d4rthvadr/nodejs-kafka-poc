.PHONY=up

up:
	- @docker-compose up -d

down:
	- @docker-compose down

create-partition-topic:
	- node partition.js			