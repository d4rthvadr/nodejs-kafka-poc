.PHONY=help

help:
	./script.sh	help
up:
	- docker-compose -f docker-compose.yaml up -d	

down:
	- @docker-compose down

create-partition-topic:
	- node partition.js			