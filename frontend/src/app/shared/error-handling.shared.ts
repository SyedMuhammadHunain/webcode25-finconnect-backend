import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

//for services
export function handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Client Error: ${error.error.message}`;
    } else {
        // Backend error
        errorMessage = `Server Error [${error.status}]: ${error.message}`;
        if (error.error?.message) {
            errorMessage += ` - ${error.error.message}`;
        }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
}
