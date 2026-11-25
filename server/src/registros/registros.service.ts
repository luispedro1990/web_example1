import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CrearRegistroDto } from './crear-registro.dto.js';
import { Registro } from './registro.entity.js';

@Injectable()
export class RegistrosService {
  constructor(
    @InjectRepository(Registro)
    private readonly repositorio: Repository<Registro>,
  ) {}

  async crear(datos: CrearRegistroDto): Promise<Registro> {
    try {
      return await this.repositorio.save(this.repositorio.create(datos));
    } catch (error) {
      // La restricción UNIQUE de la base de datos evita duplicados incluso
      // con peticiones simultáneas.
      if (
        error instanceof QueryFailedError &&
        error.message.includes('UNIQUE constraint failed')
      ) {
        throw new ConflictException('Ese email ya está registrado');
      }
      throw error;
    }
  }
}
