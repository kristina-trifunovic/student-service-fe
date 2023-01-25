import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentFormComponent } from './pages/student-form/student-form.component';


@NgModule({
  declarations: [
    StudentListComponent,
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
