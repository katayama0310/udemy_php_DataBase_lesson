- https://graphql.org/graphql-js/running-an-express-graphql-server/
- https://www.wakuwakubank.com/posts/641-nodejs-graphql/
- https://zenn.dev/sungvalley/articles/4de76c12826709
- https://zenn.dev/harusame0616/articles/170b6ae38de086 // <- この続きをやる

---

## up

```bash
docker compose up -d
```

- コンテナ立ち上げ時に、localserver が立ち上がる
- http://localhost:3000/graphql にアクセスすると、GraphQL のクエリを実行できる

## in

```bash
docker exec -it server /bin/bash
```
