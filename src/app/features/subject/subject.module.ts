import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubjectListComponent } from './pages/subject-list/subject-list.component';
import { SubjectFormComponent } from './pages/subject-form/subject-form.component';


@NgModule({
  declarations: [
    SubjectListComponent,
    SubjectFormComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    SharedModule
  ]
})
export class SubjectModule { }
