import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


// Declare API url
const endpoint = 'http://reproduct.interactiveavenues.net/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  // To extract response
  private extractData(res: Response) {
    let body = res;
    console.log('body', body);
    return body || { };
  }
  login(loginDetail): Observable<any> {
    console.log(loginDetail,'loginDetail');
    return this.http.post<any>(endpoint + 'login?email='+loginDetail.email+'&password='+loginDetail.password, JSON.stringify(loginDetail), httpOptions).pipe(
      tap((loginDetail) => console.log(JSON.stringify(loginDetail), httpOptions, 'tapped')),
      map(this.extractData),
      catchError(this.handleError<any>('login'))
    );
    // return this.http.get(endpoint + 'login').pipe(
    //   tap((loginDetail) => console.log(loginDetail)),
    //   catchError(this.handleError<any>('login'))
    //   //map(this.extractData)
    //   );
  }
  // addHero (hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('addHero', hero))
  //     );
  // }

  
  // addProduct (product): Observable<any> {
  //   console.log(product);
  //   return this.http.post<any>(endpoint + 'products', JSON.stringify(product), httpOptions).pipe(
  //     tap((product) => console.log(`added product w/ id=${product.id}`)),
  //     catchError(this.handleError<any>('addProduct'))
  //   );
  // }

  // To handle error
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
