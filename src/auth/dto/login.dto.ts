import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'comexe6790@advitize.com',
    description: 'Email to login',
    nullable: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'b.3_C20/:dzM',
    description: 'Password to person',
    minLength: 8,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
