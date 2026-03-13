import { FintechService } from './fintech.service';
import { CustomRequest } from 'src/common/interfaces/custom-request.interface';
import { TransferFundsDto } from 'src/dtos/fintech-transfer.dto';
export declare class FintechController {
    private readonly fintechService;
    constructor(fintechService: FintechService);
    getBalance(req: CustomRequest): Promise<{
        balance: number;
    }>;
    transferFunds(transferFundsDto: TransferFundsDto): Promise<{
        message: string;
    }>;
    getTransactions(req: CustomRequest, page?: number, pageSize?: number): Promise<any[]>;
    getInvoice(req: CustomRequest, start: string, end: string): Promise<any>;
}
