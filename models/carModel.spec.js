const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Car = require('./carModel');

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

describe('Car Model', () => {
  it('should create a car with valid data', async () => {
    const carData = {
      marca: 'Toyota',
      modelo: 'Corolla',
      propietario: new mongoose.Types.ObjectId(),
      propietarioTipo: 'Person',
      potencia: 150,
      fechaFabricacion: new Date('2020-01-01'),
      fechaCompra: new Date('2020-06-01'),
      precios: {
        compra: 20000,
        alquiler: 50
      }
    };

    const car = new Car(carData);
    const savedCar = await car.save();

    expect(savedCar.marca).toBe('Toyota');
    expect(savedCar.modelo).toBe('Corolla');
    expect(savedCar.estado).toBe('disponible');
    expect(savedCar.kmRecorridos).toBe(0);
  });

  it('should fail to create a car without required marca', async () => {
    const carData = {
      modelo: 'Corolla',
      propietario: new mongoose.Types.ObjectId(),
      propietarioTipo: 'Person',
      potencia: 150,
      fechaFabricacion: new Date('2020-01-01'),
      fechaCompra: new Date('2020-06-01'),
      precios: {
        compra: 20000,
        alquiler: 50
      }
    };

    const car = new Car(carData);
    await expect(car.save()).rejects.toThrow();
  });

  it('should fail with invalid estado enum', async () => {
    const carData = {
      marca: 'Toyota',
      modelo: 'Corolla',
      estado: 'invalid',
      propietario: new mongoose.Types.ObjectId(),
      propietarioTipo: 'Person',
      potencia: 150,
      fechaFabricacion: new Date('2020-01-01'),
      fechaCompra: new Date('2020-06-01'),
      precios: {
        compra: 20000,
        alquiler: 50
      }
    };

    const car = new Car(carData);
    await expect(car.save()).rejects.toThrow();
  });
});