import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

const recortar = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

const recortarEnMinusculas = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

export class CrearRegistroDto {
  @Transform(recortar)
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(50, { message: 'El nombre admite 50 caracteres como máximo' })
  nombre: string;

  @Transform(recortar)
  @IsString()
  @IsNotEmpty({ message: 'El primer apellido es obligatorio' })
  @MaxLength(50, {
    message: 'El primer apellido admite 50 caracteres como máximo',
  })
  primerApellido: string;

  @Transform(recortar)
  @IsString()
  @IsNotEmpty({ message: 'El segundo apellido es obligatorio' })
  @MaxLength(50, {
    message: 'El segundo apellido admite 50 caracteres como máximo',
  })
  segundoApellido: string;

  @Transform(recortarEnMinusculas)
  @IsEmail({}, { message: 'El email no es válido' })
  @MaxLength(254, { message: 'El email es demasiado largo' })
  email: string;
}
