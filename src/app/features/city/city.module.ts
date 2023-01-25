import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityListComponent } from './pages/city-list/city-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityFormComponent } from './pages/city-form/city-form.component';


@NgModule({
  declarations: [
    CityListComponent,
    CityFormComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    SharedModule
  ]
})
export class CityModule { }
