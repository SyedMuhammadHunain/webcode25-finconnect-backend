import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../shared/error-handling.shared';

@Injectable({
    providedIn: 'root'
})
export class StripeService {
    private apiUrl = 'http://localhost:3000/api/subscription';

    constructor(private http: HttpClient) { }

    createCheckoutSession(priceId: string): Observable<{ url: string }> {
        const params = new HttpParams().set('priceId', priceId);
        return this.http.get<{ url: string }>(`${this.apiUrl}/create-checkout-session`, { params })
            .pipe(catchError(handleError));
    }
}
