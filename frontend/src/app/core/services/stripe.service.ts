import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../shared/error-handling.shared';
import { CheckoutSessionResponse } from '../models/stripe.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StripeService {
    private apiUrl = `${environment.apiUrl}/subscription`;

    constructor(private http: HttpClient) { }

    createCheckoutSession(priceId: string): Observable<CheckoutSessionResponse> {
        const params = new HttpParams().set('priceId', priceId);
        return this.http.get<CheckoutSessionResponse>(`${this.apiUrl}/create-checkout-session`, { params })
            .pipe(catchError(handleError));
    }
}
