export interface TransferFundsData {
    sourceAccountId: string;
    destinationAccountId: string;
    amount: number;
}

export interface TransactionQueryParams {
    page?: number;
    pageSize?: number;
}

export interface InvoiceQueryParams {
    start: string;
    end: string;
}

export interface FintechResponse {
    [key: string]: unknown;
}
