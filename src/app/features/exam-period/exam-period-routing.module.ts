import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoles } from 'src/app/core/enums';
import { AuthRolesGuard } from 'src/app/core/guards/auth-roles.guard';
import { ExamPeriodFormComponent } from './pages/exam-period-form/exam-period-form.component';

const routes: Routes = [
  {path: 'form', component: ExamPeriodFormComponent},
  {path: '', pathMatch: 'full', redirectTo: 'form'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamPeriodRoutingModule { }
