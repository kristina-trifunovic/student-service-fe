import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { City } from 'src/app/core/models';
import { HttpCityService } from 'src/app/core/services/http-city/http-city.service';

@Injectable({
  providedIn: 'root'
})
export class CityLoadOneResolver implements Resolve<City> {

  constructor(private httpCity: HttpCityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<City> {
    const postalCode = Number(route.paramMap.get('postalCode'));
    return this.httpCity.findById(postalCode!);
  }
}
