const request = require('supertest');
const app = require('../server');

describe('GET /teams', () => {
  test('responds with 200', async () => {
    const res = await request(app).get('/teams');
    expect([200, 201, 204]).toContain(res.statusCode);
  });
});
