import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamPeriodRoutingModule } from './exam-period-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExamPeriodFormComponent } from './pages/exam-period-form/exam-period-form.component';


@NgModule({
  declarations: [
    ExamPeriodFormComponent
  ],
  imports: [
    CommonModule,
    ExamPeriodRoutingModule,
    SharedModule
  ]
})
export class ExamPeriodModule { }
