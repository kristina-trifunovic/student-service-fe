import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoles } from './core/enums';
import { AuthRolesGuard } from './core/guards/auth-roles.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'city',
    loadChildren: () =>
      import('./features/city/city.module').then((c) => c.CityModule),
    canActivate: [AuthRolesGuard],
    data: {roles: [UserRoles.ROLE_ADMIN]}
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./features/student/student.module').then((s) => s.StudentModule),
    canActivate: [AuthRolesGuard],
    data: {roles: [UserRoles.ROLE_ADMIN, UserRoles.ROLE_STUDENT]}
  },
  {
    path: 'subject',
    loadChildren: () =>
      import('./features/subject/subject.module').then((s) => s.SubjectModule),
    canActivate: [AuthRolesGuard],
    data: {roles: UserRoles.ROLE_ADMIN}
  },
  {
    path: 'professor',
    loadChildren: () =>
      import('./features/professor/professor.module').then(
        (p) => p.ProfessorModule
      ),
    canActivate: [AuthRolesGuard],
    data: {roles: [UserRoles.ROLE_ADMIN]}
  },
  {
    path: 'exam-period',
    loadChildren: () =>
      import('./features/exam-period/exam-period.module').then(
        (e) => e.ExamPeriodModule
      ),
    canActivate: [AuthRolesGuard],
    data: {roles: [UserRoles.ROLE_ADMIN]}
  },
  {
    path: 'exam',
    loadChildren: () =>
      import('./features/exam/exam.module').then((e) => e.ExamModule),
    canActivate: [AuthRolesGuard],
    data: {roles: [UserRoles.ROLE_ADMIN, UserRoles.ROLE_PROFESSOR]}
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((h) => h.HomeModule),
    canActivate: [AuthRolesGuard],
    data: {roles: [UserRoles.ROLE_ADMIN, UserRoles.ROLE_PROFESSOR, UserRoles.ROLE_STUDENT]}
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
