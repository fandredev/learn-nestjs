import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  check() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
