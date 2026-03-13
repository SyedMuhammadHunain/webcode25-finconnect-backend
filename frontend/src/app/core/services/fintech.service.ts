import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../shared/error-handling.shared';

@Injectable({
    providedIn: 'root'
})
export class FintechService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    getBalance(): Observable<any> {
        return this.http.get(`${this.apiUrl}/balance`)
            .pipe(catchError(handleError));
    }

    transferFunds(data: { sourceAccountId: string, destinationAccountId: string, amount: number }): Observable<any> {
        return this.http.post(`${this.apiUrl}/transfer`, data)
            .pipe(catchError(handleError));
    }

    getTransactions(page: number = 1, pageSize: number = 10): Observable<any> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());
        return this.http.get(`${this.apiUrl}/transactions`, { params })
            .pipe(catchError(handleError));
    }

    getInvoice(start: string, end: string): Observable<any> {
        const params = new HttpParams()
            .set('start', start)
            .set('end', end);
        return this.http.get(`${this.apiUrl}/invoice`, { params })
            .pipe(catchError(handleError));
    }
}
