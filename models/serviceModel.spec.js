const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Service = require('./serviceModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Service Model', () => {
  it('should create a service with valid data', async () => {
    const serviceData = {
      tipoServicio: 'mantenimiento',
      tecnico: new mongoose.Types.ObjectId(),
      precio: 200,
      vehiculo: new mongoose.Types.ObjectId()
    };

    const service = new Service(serviceData);
    const savedService = await service.save();

    expect(savedService.tipoServicio).toBe('mantenimiento');
    expect(savedService.precio).toBe(200);
  });

  it('should fail to create a service without required tipoServicio', async () => {
    const serviceData = {
      tecnico: new mongoose.Types.ObjectId(),
      precio: 200,
      vehiculo: new mongoose.Types.ObjectId()
    };

    const service = new Service(serviceData);
    await expect(service.save()).rejects.toThrow();
  });

  it('should fail with invalid tipoServicio enum', async () => {
    const serviceData = {
      tipoServicio: 'invalid',
      tecnico: new mongoose.Types.ObjectId(),
      precio: 200,
      vehiculo: new mongoose.Types.ObjectId()
    };

    const service = new Service(serviceData);
    await expect(service.save()).rejects.toThrow();
  });
});