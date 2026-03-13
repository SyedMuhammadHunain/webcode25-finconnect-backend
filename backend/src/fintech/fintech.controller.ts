import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FintechService } from './fintech.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CustomRequest } from 'src/common/interfaces/custom-request.interface';
// import { Public } from 'src/common/decorators/public.decorator';
import { TransferFundsDto } from 'src/dtos/fintech-transfer.dto';

@Controller('api')
@UseGuards(AuthGuard) // Ensure all routes require JWT
export class FintechController {
  constructor(private readonly fintechService: FintechService) {}

  @Get('balance')
  async getBalance(@Req() req: CustomRequest) {
    const userId = req.user.sub;
    return this.fintechService.getBalance(userId);
  }

  @Post('transfer')
  async transferFunds(@Body() transferFundsDto: TransferFundsDto) {
    const { sourceAccountId, destinationAccountId, amount } = transferFundsDto;
    return this.fintechService.transferFunds(
      sourceAccountId,
      destinationAccountId,
      amount,
    );
  }

  @Get('transactions')
  async getTransactions(
    @Req() req: CustomRequest,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    const userId = req.user.sub;
    return this.fintechService.getTransactions(userId, +page, +pageSize);
  }

  @Get('invoice')
  async getInvoice(
    @Req() req: CustomRequest,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const userId = req.user.sub;
    return this.fintechService.getInvoice(
      userId,
      new Date(start),
      new Date(end),
    );
  }
}
