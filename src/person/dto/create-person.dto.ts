import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { Person } from '../entities/person.entity';
import { ApiProperty } from '@nestjs/swagger';

type CreatePersonProps = Pick<Person, 'email' | 'name' | 'password'>;

export class CreatePersonDto implements CreatePersonProps {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'comexe6790@advitize.com',
    description: 'Email from person',
    nullable: false,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: 'Jane Doe',
    description: 'Name from person',
    maxLength: 255,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    example: 'b.3_C20/:dzM',
    description: 'password from person',
    minLength: 8,
    nullable: false,
  })
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
