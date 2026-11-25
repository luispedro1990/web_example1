# Web de ejemplo: registro y bienvenida

Aplicación monolítica en TypeScript: React (Vite) en el frontend, NestJS en el
backend y SQLite como base de datos. En producción un único proceso NestJS sirve
la API y el frontend compilado.

## Requisitos

Node.js 22 o superior.

## Uso

```bash
npm install
npm run build
npm start
```

Abre <http://localhost:3000>.

## Desarrollo

```bash
npm run dev
```

Abre <http://localhost:5173>. Vite recarga el frontend y reenvía `/api` al
backend, que escucha en el puerto 3000.

## Pruebas

```bash
npm test
```

## Estructura

```
client/   React: formulario (/) y bienvenida (/bienvenida)
server/   NestJS: API y entrega del frontend
  src/registros/   entidad, validación, servicio y controlador
  data/            base de datos SQLite (se crea al arrancar, no se versiona)
```

## API

`POST /api/registros` con `nombre`, `primerApellido`, `segundoApellido` y `email`.

| Código | Significado                         |
| ------ | ----------------------------------- |
| 201    | Registrado: devuelve `id`, `nombre` |
| 400    | Datos no válidos                    |
| 409    | El email ya está registrado         |

La variable `PORT` cambia el puerto y `DB_PATH` la ubicación de la base de datos.
Las tablas se crean solas (`synchronize: true`); para producción usa migraciones.
