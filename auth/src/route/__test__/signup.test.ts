import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('return a 400 with an invalid email', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test', password: 'password' })
    .expect(400);
});

it('return a 400 with an invalid password', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'pas' })
    .expect(400);
});

it('return a 400 with missing email and password', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({ email: '', password: '' })
    .expect(400);
});

it('disallow duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after a successfull signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});
