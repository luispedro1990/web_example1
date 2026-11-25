import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module.js';

const datos = {
  nombre: '  Ana ',
  primerApellido: 'García',
  segundoApellido: 'López',
  email: 'ana@example.com',
};

describe('POST /api/registros', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    process.env.DB_PATH = ':memory:';
    const modulo = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = modulo.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('guarda el registro y devuelve el nombre sin espacios', async () => {
    const respuesta = await request(app.getHttpServer())
      .post('/api/registros')
      .send(datos)
      .expect(201);

    expect(respuesta.body).toEqual({ id: 1, nombre: 'Ana' });
  });

  it('rechaza un email repetido aunque cambien las mayúsculas', () => {
    return request(app.getHttpServer())
      .post('/api/registros')
      .send({ ...datos, email: 'ANA@example.com' })
      .expect(409);
  });

  it('rechaza datos no válidos', () => {
    return request(app.getHttpServer())
      .post('/api/registros')
      .send({ ...datos, nombre: '   ', email: 'no-es-un-email' })
      .expect(400);
  });
});
