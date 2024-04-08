import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Data } from './chart/data';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherUrl = 'https://api.weather.gov/gridpoints'
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getWeather(id: any): Observable<Data>{
    const url = `${this.weatherUrl}/${id}/31,80/forecast`
    return this.http.get<Data>(url)
    .pipe(
      tap( _ => this.log(`fetched weather  from ${id}`)),
      catchError(this.handleError<Data>('getWeather'))
    )
  }

  private log(message: string) {
  this.messageService.clear()
  this.messageService.add(`WeatherService: ${message}`);
}
private handleError<T>(operation = 'operation', result?: T) {
  return(error: any): Observable<T> => {
    console.log(error)

    this.log(`${operation} failed: ${error.message}`);

    return of(result as T)
  }
}
}
