import { Module, forwardRef } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MailerConfig } from 'src/config/mailer.config';

@Module({
  imports: [forwardRef(() => AuthModule), MailerConfig],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
