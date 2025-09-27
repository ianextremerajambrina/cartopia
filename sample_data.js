// Sample data for Car model
// Corrected based on schema

const car1 = {
  marca: "Toyota",
  modelo: "Corolla",
  estado: "disponible",
  propietario: "<store_id>", // Replace with actual Store ID
  propietarioTipo: "Store",
  potencia: 120,
  fechaFabricacion: "2020-01-01T00:00:00.000Z",
  fechaCompra: "2020-06-01T00:00:00.000Z",
  kmRecorridos: 15000,
  precios: {
    compra: 20000,
    alquiler: 50
  }
};

const car2 = {
  marca: "Honda",
  modelo: "Civic",
  estado: "disponible",
  propietario: "<store_id>", // Replace with actual Store ID
  propietarioTipo: "Store",
  potencia: 130,
  fechaFabricacion: "2021-01-01T00:00:00.000Z",
  fechaCompra: "2021-06-01T00:00:00.000Z",
  kmRecorridos: 10000,
  precios: {
    compra: 22000,
    alquiler: 55
  }
};

const car3 = {
  marca: "Ford",
  modelo: "Focus",
  estado: "disponible",
  propietario: "<store_id>", // Replace with actual Store ID
  propietarioTipo: "Store",
  potencia: 110,
  fechaFabricacion: "2019-01-01T00:00:00.000Z",
  fechaCompra: "2019-06-01T00:00:00.000Z",
  kmRecorridos: 25000,
  precios: {
    compra: 18000,
    alquiler: 45
  }
};

module.exports = { car1, car2, car3 };