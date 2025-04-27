import { Injectable } from '@nestjs/common';

@Injectable()
export class LogService {
  private logs: any[] = [];

  addLog(log: any) {
    this.logs.push(log);
  }

  getAllLogs() {
    return this.logs;
  }
}
