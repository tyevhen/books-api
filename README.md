# Books API

Run `docker compose up -d --build` from project root to launch all services.

API should be available at `http://localhost:3000`.

Sample curl-s:

```
curl -X GET http://localhost:3000/book

curl -X POST http://localhost:3000/book -H "Content-Type: application/json" -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald"}'

```

