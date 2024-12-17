const request = require('supertest');
const app = require('../api/api');
const mock = require('../src/features/orders/mockData');
const repository = require('../src/features/orders/order.repository');

jest.mock('../src/features/orders/order.repository');

jest.mock('mongoose', () => {
  const mSchema = jest.fn();
  const mModel = jest.fn(() => ({
    create: jest.fn(),
    find: jest.fn(),
  }));

  return {
    connect: jest.fn().mockResolvedValue(),
    Schema: mSchema,
    model: mModel,
  };
});

describe('Orders API Endpoints', () => {
  console.log("ESTOU  EM TESTS E VOU LIMPAR OS MOCKS");
  // Antes de cada teste, define o comportamento do mock
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /orders', () => {
    console.log("ESTOU EM TESTS E VOU BUSCAR OS PEDIDOS");
    it('deve retornar a lista de pedidos', async () => {
      // Configura o mock para retornar os dados do mockOrders
      repository.findOrders.mockResolvedValue(mock);

      const res = await request(app).get('/orders');
      
      console.log(` OLHA O RESSS: ${JSON.stringify(res.body, null, 2)} `);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mock);
      expect(repository.findOrders).toHaveBeenCalledTimes(1);
    });
  });
});