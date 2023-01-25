import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectFormComponent } from './pages/subject-form/subject-form.component';
import { SubjectListComponent } from './pages/subject-list/subject-list.component';
import { SubjectLoadOneResolver } from './resolvers/subject-load-one.resolver';

const routes: Routes = [
  {path: 'list', component: SubjectListComponent},
  {path: 'form/:id', component: SubjectFormComponent, data: {mode: 'UPDATE'}, resolve: {studentData: SubjectLoadOneResolver}},
  {path: 'form', component: SubjectFormComponent, data: {mode: 'ADD'}},
  {path: '', pathMatch: 'full', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
