const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Person = require('./personModel');

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

beforeEach(async () => {
  await Person.deleteMany({});
});

describe('Person Model', () => {
  it('should create a person with valid data', async () => {
    const personData = {
      name: 'John Doe',
      identificacion: '12345678A',
      email: 'john@example.com',
      password: 'password123',
      fechaRegistro: new Date()
    };

    const person = new Person(personData);
    const savedPerson = await person.save();

    expect(savedPerson.name).toBe('John Doe');
    expect(savedPerson.identificacion).toBe('12345678A');
    expect(savedPerson.email).toBe('john@example.com');
    expect(savedPerson.rol).toBe('Cliente');
  });

  it('should fail to create a person without required name', async () => {
    const personData = {
      identificacion: '12345678A',
      email: 'john@example.com',
      password: 'password123',
      fechaRegistro: new Date()
    };

    const person = new Person(personData);
    await expect(person.save()).rejects.toThrow();
  });

  it('should fail with duplicate email', async () => {
    const personData1 = {
      name: 'John Doe',
      identificacion: '12345678A',
      email: 'john@example.com',
      password: 'password123',
      fechaRegistro: new Date()
    };

    const personData2 = {
      name: 'Jane Doe',
      identificacion: '87654321B',
      email: 'john@example.com',
      password: 'password456',
      fechaRegistro: new Date()
    };

    await new Person(personData1).save();
    const person2 = new Person(personData2);
    await expect(person2.save()).rejects.toThrow();
  });

  it('should fail with duplicate identificacion', async () => {
    const personData1 = {
      name: 'John Doe',
      identificacion: '12345678A',
      email: 'john@example.com',
      password: 'password123',
      fechaRegistro: new Date()
    };

    const personData2 = {
      name: 'Jane Doe',
      identificacion: '12345678A',
      email: 'jane@example.com',
      password: 'password456',
      fechaRegistro: new Date()
    };

    await new Person(personData1).save();
    const person2 = new Person(personData2);
    await expect(person2.save()).rejects.toThrow();
  });
});