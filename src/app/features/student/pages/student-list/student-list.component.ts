import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmOption } from 'src/app/core/enums';
import { PageRequest, Student } from 'src/app/core/models';
import { FilterRequest } from 'src/app/core/models/filter-request.dto';
import { HttpStudentService } from 'src/app/core/services/http-student/http-student.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SortableHeaderDirective, SortEvent } from 'src/app/shared/directives/sortable-header.directive';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {
  students?: Student[];
  studentToShow?: Student;

  destroy$: Subject<void> = new Subject();

  pageInfo: PageRequest = {pageNo: 1, pageSize:5, totalItems: 10, sortBy: 'lastName', sortOrder:'asc'};
  availablePageSizes = [2, 3, 5, 10];

  filterInfo: FilterRequest = {firstName: '', lastName: '', email: '', city: ''};

  @ViewChildren(SortableHeaderDirective)
  headers?: QueryList<SortableHeaderDirective>;

  constructor(private httpStudent: HttpStudentService,
              private router: Router,
              private modalService: NgbModal,
              private toastService: ToastService,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadStudents() {
    this.httpStudent.findPageFilteredStudents(this.filterInfo, this.pageInfo)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: studentPage => {
          this.students = studentPage.content;
          this.pageInfo.totalItems = studentPage.totalElements;
          this.pageInfo.pageSize = studentPage.size;
          this.pageInfo.pageNo = studentPage.number + 1;
          this.toastService.showToast({header: 'Loading students', message:'Students loaded successfully'})
        },
        error: () => this.toastService.showToast({header: 'Filtering students', message: 'Students not found with criteria', className: 'bg-danger'})
      }
    );
  }

  onPageSizeChange() {
    this.pageInfo.pageNo = 1;
      this.loadStudents();
  }

  onPageChange() {
      this.loadStudents();
  }

  openDetails(modal: any, student: Student) {
    this.modalService.open(modal);
    this.studentToShow = student;
  }

  onEditStudent(username: string) {
    this.router.navigate([`/student/form/${username}`]);
  }

  onDelete(student: Student) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.message = this.translateService.instant('COMMON.DELETE_CONFIRM_DIALOG.MESSAGE', {entityName: 'student', objectDetails: student.firstName + ' ' + student.lastName});
    modalRef.componentInstance.headerText = this.translateService.instant('COMMON.DELETE_CONFIRM_DIALOG.TITLE', {entityName: 'student'});
    modalRef.result.then(
      result => result === ConfirmOption.OK && this.deleteSelectedStudent(student)
    )
  }

  deleteSelectedStudent(student: Student) {
    this.httpStudent.deleteStudent(student)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
          next: () =>  {
            this.toastService.showToast({header: 'Deleting student', message: 'Student deleted successfully'});
            this.loadStudents();
          },
          error: () => {
          this.toastService.showToast({header: 'Deleting student', message: 'Student was not deleted', className:'bg-danger'});
          this.loadStudents();
          }
        }
    );
  }

  rollbackFilter() {
    this.removeInput();
    this.pageInfo.pageNo = 1;
    this.loadStudents();
  }

  removeInput() {
    this.removeFirstNameInput();
    this.removeLastNameInput();
    this.removeEmailInput();
    this.removeCityInput();
  }

  removeFirstNameInput() {
    this.filterInfo.firstName = '';
  }

  removeLastNameInput() {
    this.filterInfo.lastName = '';
  }

  removeEmailInput() {
    this.filterInfo.email = '';
  }

  removeCityInput() {
    this.filterInfo.city = '';
  }

  onSort(currentSort: SortEvent) {
    //ideja sa this.headers je da kada zelimo da promenimo koju kolonu cemo da sortiramo, prethodna da ne bude vise sortirana
    this.headers?.forEach(sortableDirective => 
      (sortableDirective.sortable != currentSort.column) && (sortableDirective.direction = ''))
    this.pageInfo.pageNo = 1;
    this.pageInfo.sortBy = currentSort.column;
    this.pageInfo.sortOrder = currentSort.direction;
    this.loadStudents();
  }
}
