# desafio-pfa-docker-1

Comandos para fazer a aplicação funcionar:

docker network create pfa-1-network

docker run -d --network pfa-1-network --name db -v $(pwd)/mysql:/var/lib/mysql -e MYSQL_DATABASE=nodedb -e MYSQL_ROOT_PASSWORD=root --restart always mysql:5.7 --innodb-use-native-aio=0

docker run -d --rm --network pfa-1-network --name app mateusob/node-pfa-1 bash -c "npm i && node index.js"

docker run -d --rm --network pfa-1-network --name nginx -p 8080:80 mateusob/nginx-node
