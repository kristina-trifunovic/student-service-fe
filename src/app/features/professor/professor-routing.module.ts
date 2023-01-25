import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoles } from 'src/app/core/enums';
import { ProfessorFormComponent } from './pages/professor-form/professor-form.component';
import { ProfessorListComponent } from './pages/professor-list/professor-list.component';
import { ProfessorLoadOneResolver } from './resolvers/professor-load-one.resolver';

const routes: Routes = [
  {path: 'list', component: ProfessorListComponent},
  {path: 'form/:username', component: ProfessorFormComponent, data: {mode: 'UPDATE'}, resolve: {professorData: ProfessorLoadOneResolver}},
  {path: 'form', component: ProfessorFormComponent, data: {mode: 'ADD'}},
  {path: '', pathMatch: 'full', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
