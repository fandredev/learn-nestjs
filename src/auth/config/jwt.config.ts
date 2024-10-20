import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_TOKEN_ISSUER,
  jwtExpiresIn: Number(process.env.JWT_EXPIRESIN) ?? 3600,
  jwtRefreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRESIN) ?? 86400,
}));
