import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExamFormComponent } from './pages/exam-form/exam-form.component';
import { ExamListComponent } from './pages/exam-list/exam-list.component';
import { ExamApplyComponent } from './pages/exam-apply/exam-apply.component';


@NgModule({
  declarations: [
    ExamFormComponent,
    ExamListComponent,
    ExamApplyComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    SharedModule
  ]
})
export class ExamModule { }
