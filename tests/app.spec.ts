import request from 'supertest';
import app from '../src/app';

describe('voucher router', () => {
  it('throws error if invalid data is supplied', () => {
    const data = { email: 'asjas@outloo', param: 'eyetest' };

    return request(app)
      .post('/voucher')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('sends email if valid data is provided', () => {
    const data = { email: 'asjas@outlook.com', param: 'eyetest' };

    jest.mock('nodemailer');

    return request(app)
      .post('/voucher')
      .send(data)
      .expect('Content-Type', /text/)
      .expect(200);
  });
});
