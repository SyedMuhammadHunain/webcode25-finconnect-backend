import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../shared/error-handling.shared';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {
    private apiUrl = 'http://localhost:3000/api/subscriptions';

    constructor(private http: HttpClient) { }

    subscribe(subscriptionType: string, amount: number): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.apiUrl}/subscribe`, { subscriptionType, amount })
            .pipe(catchError(handleError));
    }

    cancel(): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.apiUrl}/cancel`, {})
            .pipe(catchError(handleError));
    }
}
