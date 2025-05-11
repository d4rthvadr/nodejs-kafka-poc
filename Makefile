.PHONY=help

help:
	./script.sh	help
up:
	- docker-compose -f docker-compose.yaml up -d	

down:
	- docker-compose down

initialize: 
	- echo "Initializing the environment...with topics, partitions, and replication"
	- node ./init/index.js
	
create-partition-topic:
	- node partition.js			