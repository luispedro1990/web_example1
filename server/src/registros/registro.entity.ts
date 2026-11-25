import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('registros')
export class Registro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  primerApellido: string;

  @Column({ type: 'varchar', length: 50 })
  segundoApellido: string;

  @Column({ type: 'varchar', length: 254, unique: true })
  email: string;

  @CreateDateColumn()
  creadoEn: Date;
}
