import request from 'supertest';
import server from 'src/server';

describe('Health Controller Integration Test', () => {
  it('Should check the server', async () => {
    const response = await request(server).get('/api/v1/health');
    expect(response.status).toBe(200);
  })
});