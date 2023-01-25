import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoles } from 'src/app/core/enums';
import { AuthRolesGuard } from 'src/app/core/guards/auth-roles.guard';
import { ExamFormComponent } from './pages/exam-form/exam-form.component';
import { ExamListComponent } from './pages/exam-list/exam-list.component';

const routes: Routes = [
  {path: 'form', component: ExamFormComponent, canActivate: [AuthRolesGuard], data: {roles: [UserRoles.ROLE_ADMIN]}},
  {path: 'list', component: ExamListComponent, canActivate: [AuthRolesGuard], data: {roles: [UserRoles.ROLE_ADMIN, UserRoles.ROLE_PROFESSOR]}},
  {path: '', pathMatch: 'full', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
