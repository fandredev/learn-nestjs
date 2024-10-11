import { IsEmail, IsString } from 'class-validator';
import { Message } from 'src/messages/entities/message-entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  @IsString()
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column()
  @IsString()
  name: string;

  // Uma envia pode ter enviados muitos recados como ('of')
  // Esses recados são relacionados ao campo 'de' na entidade recado
  @OneToMany(() => Message, (message) => message.of)
  message_sended: Message[];

  // Uma envia pode ter recebido muitos recados como ('to')
  // Esses recados são relacionados ao campo 'to' na entidade recado
  @OneToMany(() => Message, (message) => message.to)
  message_received: Message[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
