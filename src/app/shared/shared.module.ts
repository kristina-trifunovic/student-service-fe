import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule, NgbPaginationModule, NgbToastModule, NgbNavModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastComponent } from './components/toast/toast.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SortableHeaderDirective } from './directives/sortable-header.directive';
import { BootstrapIconsSetupModule } from './bootstrap-icons/bootstrap-icons-setup.module';
// import { BootstrapIconsModule } from 'ng-bootstrap-icons';




@NgModule({
  declarations: [
    ToastComponent,
    ConfirmDialogComponent,
    HeaderComponent,
    SortableHeaderDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbModalModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgbToastModule,
    NgSelectModule,
    NgbNavModule,
    RouterModule,
    NgbDropdownModule,
    BootstrapIconsSetupModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbModalModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgbToastModule,
    ToastComponent,
    NgSelectModule,
    HeaderComponent,
    ToastComponent,
    ConfirmDialogComponent,
    NgbNavModule,
    NgbDropdownModule,
    SortableHeaderDirective,
    BootstrapIconsSetupModule
  ]
})
export class SharedModule { }
