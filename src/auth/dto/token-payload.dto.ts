import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDTO {
  @ApiProperty({
    description: 'ID from user authenticated',
    nullable: false,
  })
  sub: string;

  @ApiProperty({
    example: 'comexe6790@advitize.com',
    description: 'Email to login',
  })
  email: string;

  @ApiProperty({
    example: 1516239022,
    description: 'Timestamp from token emited',
  })
  iat: number;

  @ApiProperty({
    example: 1516239022,
    description: 'Timestamp from token expires',
  })
  exp: number;

  aud: string;
  iss: string;
}
