import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models';
import { APIResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private htpp: HttpClient) { }

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering', ordering);
    if(search){
      params = new HttpParams().set('ordering', ordering).set('search',search);
    }
    return this.htpp.get<APIResponse<Game>>(`${environment.BASE_URL}/games`,{
      params: params,
    });
  }
}
