const mongoose = require('mongoose');

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

// Mock process.env
process.env.DATABASE = 'mongodb://localhost:27017/test';
process.env.DATABASE_PASSWORD = 'password';
process.env.PORT = '3000';

// Mock mongoose.connect
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(),
  connection: {
    readyState: 1
  }
}));

// Mock app
jest.mock('./app', () => ({
  listen: jest.fn()
}));

describe('Server', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should attempt to connect to database', async () => {
    // Require server.js to trigger the connection
    require('./server');

    expect(mongoose.connect).toHaveBeenCalled();
  });

  // Note: Server.listen is called, but hard to test without mocking app.listen
});