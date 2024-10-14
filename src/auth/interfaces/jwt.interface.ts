export interface Jwt {
  secret: string;
  audience: string;
  issuer: string;
  jwtTtl: number;
}
