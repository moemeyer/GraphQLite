curl -o docker-compose.yml https://raw.githubusercontent.com/relatedcode/GraphQLite/main/docker-compose.yml

mkdir config

curl -o config/resolvers.js https://raw.githubusercontent.com/relatedcode/GraphQLite/main/templates/objects/config/resolvers.js
curl -o config/schema.sql https://raw.githubusercontent.com/relatedcode/GraphQLite/main/templates/objects/config/schema.sql
curl -o config/schema.graphql https://raw.githubusercontent.com/relatedcode/GraphQLite/main/templates/objects/config/schema.graphql

docker-compose up -d