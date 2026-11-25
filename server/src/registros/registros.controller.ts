import { Body, Controller, Post } from '@nestjs/common';
import { CrearRegistroDto } from './crear-registro.dto.js';
import { RegistrosService } from './registros.service.js';

@Controller('api/registros')
export class RegistrosController {
  constructor(private readonly servicio: RegistrosService) {}

  @Post()
  async crear(@Body() datos: CrearRegistroDto) {
    const { id, nombre } = await this.servicio.crear(datos);
    // Solo se devuelve lo que necesita la página de bienvenida.
    return { id, nombre };
  }
}
