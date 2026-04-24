// External imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'int', default: 0 })
  currentLoad: number;

  @Column({ type: 'varchar', length: 255 })
  managerName: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;
}
