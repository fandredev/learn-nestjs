import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { Person } from '../entities/person.entity';

type CreatePersonProps = Pick<Person, 'email' | 'name' | 'password'>;

export class CreatePersonDto implements CreatePersonProps {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minLength: 8,
  })
  password: string;
}
