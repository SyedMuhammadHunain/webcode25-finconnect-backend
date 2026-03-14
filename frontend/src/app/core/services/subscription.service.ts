import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../shared/error-handling.shared';
import { SubscriptionResponse, SubscriptionData } from '../models/subscription.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {
    private apiUrl = `${environment.apiUrl}/subscriptions`;

    constructor(private http: HttpClient) { }

    subscribe(data: SubscriptionData): Observable<SubscriptionResponse> {
        return this.http.post<SubscriptionResponse>(`${this.apiUrl}/subscribe`, data)
            .pipe(catchError(handleError));
    }

    cancel(): Observable<SubscriptionResponse> {
        return this.http.post<SubscriptionResponse>(`${this.apiUrl}/cancel`, {})
            .pipe(catchError(handleError));
    }
}
