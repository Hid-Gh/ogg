import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {
  private url = "https://mailthis.to/emaneskinder57@gmail.com"
  response!:any
  constructor(private http: HttpClient) { }
  SendEmail(input: any) {
    return this.http.post(this.url, input, this.response).pipe(
      map(
        (response:any) => {
            if (response) {
        return response
            }
        },
        (error: any) => {
            if (error) {
        return error
            }
         }
      )
        )
      }
}
