# Basketball Game & Tournament Management REST API

Simple MVP REST API to manage Teams, Players, and Games using Express and Sequelize (SQLite).

Quick start

1. Install dependencies:

```bash
npm install
```

2. Seed the database:

```bash
npm run seed
```

3. Start the server (dev):

```bash
npm run dev
```

Endpoints

- `GET /teams`, `POST /teams`, `GET /teams/:id`, `PUT /teams/:id`, `DELETE /teams/:id`
- `GET /players`, `POST /players`, `GET /players/:id`, `PUT /players/:id`, `DELETE /players/:id`
- `GET /games`, `POST /games`, `GET /games/:id`, `PUT /games/:id`, `DELETE /games/:id`

Tests

```bash
npm test
```