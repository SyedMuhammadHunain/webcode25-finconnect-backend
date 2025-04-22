import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('email')
@UseGuards(AuthGuard)
export class EmailController {}
