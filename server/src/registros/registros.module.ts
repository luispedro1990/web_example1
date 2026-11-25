import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registro } from './registro.entity.js';
import { RegistrosController } from './registros.controller.js';
import { RegistrosService } from './registros.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Registro])],
  controllers: [RegistrosController],
  providers: [RegistrosService],
})
export class RegistrosModule {}
