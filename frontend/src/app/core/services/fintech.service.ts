import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../shared/error-handling.shared';
import { TransferFundsData, FintechResponse } from '../../models/fintech.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FintechService {
    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    getBalance(): Observable<FintechResponse> {
        return this.http.get<FintechResponse>(`${this.apiUrl}/balance`)
            .pipe(catchError(handleError));
    }

    transferFunds(data: TransferFundsData): Observable<FintechResponse> {
        return this.http.post<FintechResponse>(`${this.apiUrl}/transfer`, data)
            .pipe(catchError(handleError));
    }

    getTransactions(page: number = 1, pageSize: number = 10): Observable<FintechResponse> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());
        return this.http.get<FintechResponse>(`${this.apiUrl}/transactions`, { params })
            .pipe(catchError(handleError));
    }

    getInvoice(start: string, end: string): Observable<FintechResponse> {
        const params = new HttpParams()
            .set('start', start)
            .set('end', end);
        return this.http.get<FintechResponse>(`${this.apiUrl}/invoice`, { params })
            .pipe(catchError(handleError));
    }
}
