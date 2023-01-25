import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { Trash, Pencil, InfoLg, Funnel, XLg, CaretUp, Book } from 'ng-bootstrap-icons/icons'

const icons = { Trash, Pencil, InfoLg, Funnel, XLg, CaretUp, Book }

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BootstrapIconsModule.pick(icons)
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class BootstrapIconsSetupModule { }
