const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Store = require('./storeModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
}, 10000);

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('Store Model', () => {
  it('should create a store with valid data', async () => {
    const storeData = {
      nombreTienda: 'AutoStore Madrid',
      ubicacion: {
        pais: 'Spain',
        direccion: 'Calle Mayor 1',
        codigoPostal: '28001',
        municipio: 'Madrid',
        comunidadAutonoma: 'Madrid'
      }
    };

    const store = new Store(storeData);
    const savedStore = await store.save();

    expect(savedStore.nombreTienda).toBe('AutoStore Madrid');
    expect(savedStore.vehiculos).toEqual([]);
    expect(savedStore.empleados).toEqual([]);
  });

  it('should fail to create a store without required nombreTienda', async () => {
    const storeData = {
      ubicacion: {
        pais: 'Spain',
        direccion: 'Calle Mayor 1',
        codigoPostal: '28001',
        municipio: 'Madrid',
        comunidadAutonoma: 'Madrid'
      }
    };

    const store = new Store(storeData);
    await expect(store.save()).rejects.toThrow();
  });
});