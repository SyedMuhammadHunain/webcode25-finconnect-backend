// transfer-funds.dto.ts
import { IsNumber, IsString, IsPositive } from 'class-validator';

export class TransferFundsDto {
  @IsString()
  sourceAccountId: string;

  @IsString()
  destinationAccountId: string;

//   @IsNumber()
//   @IsPositive()
  amount: number;
}
