import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmOption } from 'src/app/core/enums';
import { PageRequest, Professor, Subject } from 'src/app/core/models';
import { HttpProfessorService } from 'src/app/core/services/http-professor/http-professor.service';
import { HttpSubjectService } from 'src/app/core/services/http-subject/http-subject.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit, OnDestroy {
  professors?: Professor[];
  professorToShow?: Professor;
  subjects?: Subject[];

  subscriptions = new Subscription();
  pageInfo: PageRequest = {pageNo: 1, pageSize:5, totalItems: 10, sortBy: 'firstName', sortOrder:'asc'};
  availablePageSizes = [2, 3, 5, 10];
  
  constructor(private httpProfessor: HttpProfessorService,
    private httpSubject: HttpSubjectService,
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
    this.loadProfessors();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadProfessors() {
    this.subscriptions.add(
      this.httpProfessor.findPage(this.pageInfo)
      .subscribe( professorPage => {
        this.professors = professorPage.content;
        this.pageInfo.totalItems = professorPage.totalElements;
        this.pageInfo.pageSize = professorPage.size;
        this.pageInfo.pageNo = professorPage.number + 1;
        this.toastService.showToast({header: 'Loading professors', message:'Professors loaded successfully'})
        })
      );
  }

  onPageSizeChange() {
    this.pageInfo.pageNo = 1;
    this.loadProfessors();
  }

  onPageChange() {
    this.loadProfessors();
  }

  openDetails(modal: any, professor: Professor) {
    this.modalService.open(modal);
    this.professorToShow = professor;
    this.httpSubject.findSubjectsByProfessorId(professor.username).subscribe(subjects => this.subjects = subjects);
  }

  onEditProfessor(username: string) {
    this.router.navigate([`professor/form/${username}`]);
  }

  onDelete(professor: Professor) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.message = this.translateService.instant('COMMON.DELETE_CONFIRM_DIALOG.MESSAGE', {entityName: 'student', objectDetails: professor.firstName + ' ' + professor.lastName});
    modalRef.componentInstance.headerText = this.translateService.instant('COMMON.DELETE_CONFIRM_DIALOG.TITLE', {entityName: 'student'});
    modalRef.result.then(
      result => result === ConfirmOption.OK && this.deleteSelectedProfessor(professor)
    )
  }

  deleteSelectedProfessor(professor: Professor) {
    this.subscriptions.add(
      this.httpProfessor.deleteProfessor(professor).subscribe(
        {
          next: () =>  {
            this.toastService.showToast({header: 'Deleting professor', message: 'Professor deleted successfully'});
            this.loadProfessors();
          },
          error: () => {
          this.toastService.showToast({header: 'Deleting professor', message: 'Professor was not deleted', className:'bg-danger'});
          this.loadProfessors();
          }
        }
      )
    );
  }
}
