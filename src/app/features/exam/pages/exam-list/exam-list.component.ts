import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { Exam, PageRequest } from 'src/app/core/models';
import { HttpExamService } from 'src/app/core/services/http-exam/http-exam.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserLoginDataService } from 'src/app/core/services/user-login-data/user-login-data.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit, OnDestroy {
  examToShow?: Exam;
  destroy$: Subject<void> = new Subject();
  pageInfo: PageRequest = {pageNo: 1, pageSize:5, totalItems: 10, sortBy: 'examDate', sortOrder:'asc'};
  availablePageSizes = [2, 3, 5, 10];
  exams?: Exam[];
  appliedExams?: Exam[];

  constructor(private httpExam: HttpExamService,
    private modalService: NgbModal,
    private toastService: ToastService,
    public userLoginData: UserLoginDataService) {
    }

  ngOnInit(): void {
    this.loadExams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadExams() {
    this.httpExam.findPage(this.pageInfo)
      .pipe(takeUntil(this.destroy$))
      .subscribe( examPage => {
        this.exams = examPage.content;
        this.pageInfo.totalItems = examPage.totalElements;
        this.pageInfo.pageSize = examPage.size;
        this.pageInfo.pageNo = examPage.number + 1;
        this.toastService.showToast({header: 'Loading exams', message:'Exams loaded successfully'})
      })
  }

  onPageSizeChange() {
    this.pageInfo.pageNo = 1;
    this.loadExams();
  }

  onPageChange() {
    this.loadExams();
  }

  openDetails(modal: any, exam: Exam) {
    this.modalService.open(modal);
    this.examToShow = exam;
  }

  updateExam(exam: Exam, modal: any, grade: string) {
    exam.grade = Number(grade);
    if (exam.grade >= 5 && exam.grade <= 10) {
      this.httpExam.updateExam(exam)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toastService.showToast({header: 'Updating exam', message: 'Grade updated successfully'});
            modal.dismiss();
          },
          error: () => this.toastService.showToast({header: 'Updating exam', message: 'Exam was not updated', className:'bg-danger'})
        });
    }
  }

}
