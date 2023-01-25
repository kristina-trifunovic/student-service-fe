import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityFormComponent } from './pages/city-form/city-form.component';
import { CityListComponent } from './pages/city-list/city-list.component';
import { CityLoadOneResolver } from './resolvers/load-one/city-load-one.resolver';

const routes: Routes = [
  {path: 'list', component: CityListComponent},
  {path: 'form/:postalCode', component: CityFormComponent, data: {mode: 'UPDATE'}, resolve: {cityData: CityLoadOneResolver}},
  {path: 'form', component: CityFormComponent, data: {mode: 'ADD'}},
  {path: '', pathMatch: 'full', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
