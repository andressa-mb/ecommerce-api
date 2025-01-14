const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../api/api');
const repository = require('../src/features/orders/order.repository');

jest.mock('../src/features/orders/order.repository', () => ({
  findOrders: jest.fn(),
}));


jest.mock('mongoose', () => {
  const mSchema = jest.fn();
  const mModel = jest.fn(() => ({
    create: jest.fn(),
    find: jest.fn().mockResolvedValue([]),
  }));

  return {
    connect: jest.fn().mockResolvedValue(),
    Schema: mSchema,
    model: mModel,
    connection: {
      close: jest.fn().mockResolvedValue(),
    },
  };
});

describe('Orders API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /orders', () => {
    it('It must return the list of orders', async () => {
      const orders = [
        {
            orderId: 1,
            orderDate: Date.now(),
            orderStatus: 'PAYED',
            clientName: 'João Silva',
            clientEmail: 'joao.silva@email.com',
            orderValue: 150.0,
            shippingValue: 10.0,
            address: {
                cep: 12345678,
                street: 'Rua Exemplo, 123',
            },
            paymentMethod: 'CREDIT',
            items: [
                {
                    itemId: 101,
                    itemDescription: 'Produto 1',
                    itemValue: 50.0,
                    itemQuantity: 2,
                    discount: 5.0,
                },
            ],
        },
        {
            orderId: 2,
            orderDate: Date.now(),
            orderStatus: 'OPEN',
            clientName: 'Maria Souza',
            clientEmail: 'maria.souza@email.com',
            orderValue: 250.0,
            shippingValue: 15.0,
            address: {
                cep: 87654321,
                street: 'Avenida Teste, 456',
            },
            paymentMethod: 'DEBIT',
            items: [
                {
                    itemId: 102,
                    itemDescription: 'Produto 2',
                    itemValue: 125.0,
                    itemQuantity: 2,
                    discount: 10.0,
                },
            ],
        },
        {
            orderId: 3,
            orderDate: Date.now(),
            orderStatus: 'OPEN',
            clientName: 'Luis Tomé',
            clientEmail: 'luis.tome@email.com',
            orderValue: 350.00,
            shippingValue: 20.0,
            address: {
                cep: 98745625,
                street: 'Rua testando, 125',
            },
            paymentMethod: 'CREDIT',
            items: [
                {
                    itemId: 103,
                    itemDescription: 'Produto 3',
                    itemValue: 87.50,
                    itemQuantity: 4,
                    discount: 0.0,
                },
            ],
        },
      ];
      
      repository.findOrders.mockResolvedValue(orders);

      const res = await request(app).get('/orders');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(orders);
      expect(repository.findOrders).toHaveBeenCalledTimes(1);
    });

    it('It must return error to access orders', async () => {
      repository.findOrders.mockRejectedValue(new Error('Error to get orders.'));

      const res = await request(app).get('/orders');
      expect(res.statusCode).toBe(500);
      expect(res.body).toMatchObject({
        message: expect.stringContaining('Error to get orders.')
      });
      expect(repository.findOrders).toHaveBeenCalledTimes(1);
    })
  });

});