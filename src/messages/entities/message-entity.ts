import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
// Entidade do banco de dado
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @ManyToOne(() => Person) // Muitos recados podem ser enviados por uma única pessoa
  @JoinColumn({ name: 'of' }) // Especifica a coluna 'de' que armazena o id da pessoa que enviou o recado
  of: Person;

  @ManyToOne(() => Person) // Muitos recados podem ser enviados para uma única pessoa
  @JoinColumn({ name: 'to' }) // Especifica a coluna 'de' que armazena o id da pessoa que recebe o recado
  to: Person;

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
