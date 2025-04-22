import { Module } from '@nestjs/common';
import { FintechService } from './fintech.service';
import { FintechController } from './fintech.controller';
import { UserModule } from 'src/user/user.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { JwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [UserModule, TransactionModule, JwtConfig],
  controllers: [FintechController],
  providers: [FintechService],
})
export class FintechModule {}
