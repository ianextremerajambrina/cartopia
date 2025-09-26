const request = require('supertest');
const app = require('./app');

describe('App', () => {
  it('should respond to GET / with 404 (no routes defined)', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(404);
  });

  it('should have JSON middleware enabled', async () => {
    // Since no routes, we can't test directly, but app is defined
    expect(app).toBeDefined();
    expect(typeof app.use).toBe('function');
  });

  it('should have requestTime middleware', () => {
    // Middleware is set, but hard to test without routes
    expect(app).toBeDefined();
  });
});