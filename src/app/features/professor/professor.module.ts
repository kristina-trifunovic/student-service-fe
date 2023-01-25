import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorListComponent } from './pages/professor-list/professor-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfessorFormComponent } from './pages/professor-form/professor-form.component';


@NgModule({
  declarations: [
    ProfessorListComponent,
    ProfessorFormComponent
  ],
  imports: [
    CommonModule,
    ProfessorRoutingModule,
    SharedModule
  ]
})
export class ProfessorModule { }
