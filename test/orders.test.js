const request = require('supertest');
const app = require('../api/api');
const mock = require('./mockData');
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /orders', () => {
    it('deve retornar a lista de pedidos', async () => {
      repository.findOrders.mockResolvedValue(mock);

      const res = await request(app).get('/orders');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mock);
      expect(repository.findOrders).toHaveBeenCalledTimes(1);
    });
  });
});