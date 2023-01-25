import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoles } from 'src/app/core/enums';
import { AuthRolesGuard } from 'src/app/core/guards/auth-roles.guard';
import { ExamApplyComponent } from '../exam/pages/exam-apply/exam-apply.component';
import { StudentFormComponent } from './pages/student-form/student-form.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentLoadOneResolver } from './resolvers/student-load-one.resolver';

const routes: Routes = [
  {path: 'list', component: StudentListComponent, canActivate: [AuthRolesGuard], data: {roles: [UserRoles.ROLE_ADMIN]}},
  {path: 'form/:username', component: StudentFormComponent, canActivate: [AuthRolesGuard], data: {mode: 'UPDATE', roles: [UserRoles.ROLE_ADMIN]}, resolve: {studentData: StudentLoadOneResolver}},
  {path: 'form', component: StudentFormComponent, canActivate: [AuthRolesGuard], data: {mode: 'ADD', roles: [UserRoles.ROLE_ADMIN]}},
  {path: 'apply', component: ExamApplyComponent, canActivate: [AuthRolesGuard], data: {roles: [UserRoles.ROLE_STUDENT, UserRoles.ROLE_ADMIN]}},
  {path: '', pathMatch: 'full', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
