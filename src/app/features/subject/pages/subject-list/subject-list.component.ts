import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmOption } from 'src/app/core/enums';
import { PageRequest, Subject } from 'src/app/core/models';
import { HttpSubjectService } from 'src/app/core/services/http-subject/http-subject.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit, OnDestroy {
  subjects?: Subject[];
  subjectToShow?: Subject;

  subscriptions = new Subscription();
  pageInfo: PageRequest = {pageNo: 1, pageSize:5, totalItems: 10, sortBy: 'id', sortOrder:'asc'};
  availablePageSizes = [2, 3, 5, 10];

  constructor(private httpSubject: HttpSubjectService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    const pageNoParam = Number(this.activeRoute.snapshot.queryParamMap.get('pageNo'));
    if (pageNoParam) {
      this.pageInfo.pageNo =  pageNoParam;
      this.pageInfo.pageSize =  Number(this.activeRoute.snapshot.queryParamMap.get('pageSize'));
    }
    this.loadSubjects();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadSubjects() {
    this.subscriptions.add(
      this.httpSubject.findPage(this.pageInfo)
      .subscribe( subjectPage => {
        this.subjects = subjectPage.content;
        this.pageInfo.totalItems = subjectPage.totalElements;
        this.pageInfo.pageSize = subjectPage.size;
        this.pageInfo.pageNo = subjectPage.number + 1;
        this.toastService.showToast({header: 'Loading subjects', message:'Subjects loaded successfully'})
      })
    );
  }

  onPageSizeChange() {
    this.pageInfo.pageNo = 1;
    this.loadSubjects();
  }

  onPageChange() {
    this.loadSubjects();
  }

  openDetails(modal: any, subject: Subject) {
    this.modalService.open(modal);
    this.subjectToShow = subject;
  }

  onEditSubject(id: number | undefined) {
    this.router.navigate([`subject/form/${id}`]);
  }

  onDelete(subject: Subject) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.message = this.translateService.instant('COMMON.DELETE_CONFIRM_DIALOG.MESSAGE', {entityName: 'subject', objectDetails: subject.name});
    modalRef.componentInstance.headerText = this.translateService.instant('COMMON.DELETE_CONFIRM_DIALOG.TITLE', {entityName: 'subject'});
    modalRef.result.then(
      result => result === ConfirmOption.OK && this.deleteSelectedSubject(subject)
    )
  }

  deleteSelectedSubject(subject: Subject) {
    this.subscriptions.add(
      this.httpSubject.deleteSubject(subject.id!).subscribe(
        {
          next: () =>  {
            this.toastService.showToast({header: 'Deleting subject', message: 'Subject deleted successfully'});
            this.loadSubjects();
          },
          error: () => {
          this.toastService.showToast({header: 'Deleting subject', message: 'Subject was not deleted', className:'bg-danger'});
          this.loadSubjects();
          }
        }
      )
    );
  }


}
