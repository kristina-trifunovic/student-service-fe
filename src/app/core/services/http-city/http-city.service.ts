import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City, PageDto, PageRequest } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class HttpCityService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<City[]> {
    return this.httpClient.get<City[]>(`${environment.serverUrl}/cities`);
  }

  findPage(pageRequest: PageRequest) {
    const params = new HttpParams()
          .set('pageNo', pageRequest.pageNo-1)
          .set('pageSize',pageRequest.pageSize )
          .set('sortBy', pageRequest.sortBy)
          .set('sortOrder', pageRequest.sortOrder)

    return this.httpClient.get<PageDto<City>>(`${environment.serverUrl}/cities/page`, {params});
  }

  findById(postalCode: number): Observable<City> {
    return this.httpClient.get<City>(`${environment.serverUrl}/cities/${postalCode}`);
  }

  updateCity(city: City): Observable<City> {
    return this.httpClient.put<City>(`${environment.serverUrl}/cities`, city);
  }

  addCity(city: City): Observable<City> {
    return this.httpClient.post<City>(`${environment.serverUrl}/cities`, city);
  }

  deleteCity(city: City): Observable<string> {
    return this.httpClient.delete<string>(`${environment.serverUrl}/cities/${city.postalCode}`, {responseType: 'text' as 'json'});
  }

}
