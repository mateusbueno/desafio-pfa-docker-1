# desafio-pfa-docker-1

Comandos para fazer a aplicação funcionar:

git clone https://github.com/mateusbueno/desafio-pfa-docker-1.git

docker network create pfa-1-network

docker run -d --network pfa-1-network --name db -v $(pwd)/mysql:/var/lib/mysql -v $(pwd)/scripts:/docker-entrypoint-initdb.d -e MYSQL_DATABASE=nodedb -e MYSQL_ROOT_PASSWORD=root --restart always mysql:5.7 --innodb-use-native-aio=0

docker run -d --rm --network pfa-1-network --name app -v $(pwd)/node:/usr/src/app mateusob/node-pfa-1 bash -c "npm i && node index.js"

docker run -d --rm --network pfa-1-network --name nginx -p 8080:80 mateusob/nginx-node
