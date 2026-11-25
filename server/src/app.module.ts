import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrosModule } from './registros/registros.module.js';

// Las rutas son relativas a este archivo (src/ o dist/), no al directorio actual.
const rutaClient = resolve(import.meta.dirname, '../../client/dist');
const rutaDbPorDefecto = resolve(import.meta.dirname, '../data/registro.sqlite');

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const database = process.env.DB_PATH ?? rutaDbPorDefecto;
        if (database !== ':memory:') {
          mkdirSync(dirname(database), { recursive: true });
        }
        return {
          type: 'better-sqlite3' as const,
          database,
          autoLoadEntities: true,
          // Crea y actualiza las tablas automáticamente. En producción se
          // deben usar migraciones.
          synchronize: true,
        };
      },
    }),
    // Sirve el frontend compilado: un solo proceso para toda la aplicación.
    ServeStaticModule.forRoot({
      rootPath: rutaClient,
      exclude: ['/api/{*ruta}'],
    }),
    RegistrosModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
