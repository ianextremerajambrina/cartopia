const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Rental = require('./rentalModel');

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

describe('Rental Model', () => {
  it('should create a rental with valid data', async () => {
    const rentalData = {
      tienda: new mongoose.Types.ObjectId(),
      cliente: new mongoose.Types.ObjectId(),
      vehiculo: new mongoose.Types.ObjectId(),
      fechaInicio: new Date('2023-01-01'),
      fechaFin: new Date('2023-01-10'),
      precioTotal: 500
    };

    const rental = new Rental(rentalData);
    const savedRental = await rental.save();

    expect(savedRental.estado).toBe('reservado');
    expect(savedRental.fechaDevolucion).toBeNull();
  });

  it('should fail to create a rental without required tienda', async () => {
    const rentalData = {
      cliente: new mongoose.Types.ObjectId(),
      vehiculo: new mongoose.Types.ObjectId(),
      fechaInicio: new Date('2023-01-01'),
      fechaFin: new Date('2023-01-10'),
      precioTotal: 500
    };

    const rental = new Rental(rentalData);
    await expect(rental.save()).rejects.toThrow();
  });

  it('should fail with invalid estado enum', async () => {
    const rentalData = {
      tienda: new mongoose.Types.ObjectId(),
      cliente: new mongoose.Types.ObjectId(),
      vehiculo: new mongoose.Types.ObjectId(),
      estado: 'invalid',
      fechaInicio: new Date('2023-01-01'),
      fechaFin: new Date('2023-01-10'),
      precioTotal: 500
    };

    const rental = new Rental(rentalData);
    await expect(rental.save()).rejects.toThrow();
  });
});