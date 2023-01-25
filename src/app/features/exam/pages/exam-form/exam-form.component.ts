import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exam, ExamId, ExamPeriod, Professor, Student, Subject, User } from 'src/app/core/models';
import { HttpExamPeriodService } from 'src/app/core/services/http-exam-period/http-exam-period.service';
import { HttpExamService } from 'src/app/core/services/http-exam/http-exam.service';
import { HttpProfessorService } from 'src/app/core/services/http-professor/http-professor.service';
import { HttpStudentService } from 'src/app/core/services/http-student/http-student.service';
import { HttpSubjectService } from 'src/app/core/services/http-subject/http-subject.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserLoginDataService } from 'src/app/core/services/user-login-data/user-login-data.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit, OnDestroy {
  examForm?: FormGroup;
  examPeriods?: ExamPeriod[];
  subjects?: Subject[];
  professors?: Professor[];
  userLoggedIn?: User;
  subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
    private httpExam: HttpExamService,
    private httpExamPeriod: HttpExamPeriodService,
    private httpSubject: HttpSubjectService,
    private userLoginData: UserLoginDataService,
    private httpStudent: HttpStudentService,
    private router: Router,
    private toastService: ToastService,
    @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.loadExamPeriods();
    this.loadSubjects();
    this.userLoggedIn = this.userLoginData.userLoggedIn;
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadExamPeriods() {
    this.subscriptions.add(
      this.httpExamPeriod.findAll()
        .subscribe( examPeriods => this.examPeriods = examPeriods)
    );
  }

  loadSubjects() {
    this.subscriptions.add(
      this.httpSubject.findAll()
        .subscribe( subjects => this.subjects = subjects)
    );
  }

  buildForm() {
    this.examForm = this.fb.group({
      examPeriod: [, Validators.required],
      subject: [, Validators.required],
      professor: [, Validators.required],
      date: [, Validators.required]
    });    
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  saveExam() {
    const exam: Exam = {...this.examForm?.getRawValue()};
    exam.examDate = formatDate(this.examForm?.get('date')?.value, 'dd.MM.yyyy', this.locale);
    exam.id = {examPeriodId: exam.examPeriod.id, professorId: exam.professor.username, subjectId: exam.subject.id};
    this.subscriptions.add(
      this.httpExam.addExam(exam)
        .subscribe({
          next: () => {
            this.toastService.showToast({header: 'Saving exam', message:'Exam added successfully'});
            this.router.navigate(['exam']);
          },
          error: () => this.toastService.showToast({header: 'Saving exam', message:'Exam not added successfully', className:'bg-danger'})
        })
    );
  }

  hasErrors(componentName: string, errorCode?: string) {
    return  (this.examForm?.get(componentName)?.dirty || this.examForm?.get(componentName)?.touched) &&
    ((!errorCode && this.examForm?.get(componentName)?.errors ) ||
    (errorCode && this.examForm?.get(componentName)?.hasError(errorCode)));
  }

  getProfessors() {
    let subjectId = this.examForm?.get('subject')?.value.id;
    this.httpSubject.findProfessorsBySubject(subjectId).subscribe( professors => this.professors = professors);
  }
}
