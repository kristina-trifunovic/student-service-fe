import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Exam, Student, User } from 'src/app/core/models';
import { HttpExamService } from 'src/app/core/services/http-exam/http-exam.service';
import { HttpStudentService } from 'src/app/core/services/http-student/http-student.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserLoginDataService } from 'src/app/core/services/user-login-data/user-login-data.service';

@Component({
  selector: 'app-exam-apply',
  templateUrl: './exam-apply.component.html',
  styleUrls: ['./exam-apply.component.css']
})
export class ExamApplyComponent implements OnInit, OnDestroy {
  examsForm?: FormGroup;
  exams?: Exam[];
  // students?: Student[];
  user?: User;
  destroy$: Subject<void> = new Subject();

  constructor(private httpExam: HttpExamService,
    private fb: FormBuilder,
    private router: Router,
    private userLoginData: UserLoginDataService,
    private httpStudent: HttpStudentService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.user = this.userLoginData.userLoggedIn;
    this.loadExams();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadExams() {
    this.httpExam.findAllExamsForStudentToApplyTo(this.user!.username)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.exams = response;
          this.toastService.showToast({header: 'Loading exams', message: 'Exams loaded successfully'})
        },
        error: () => this.toastService.showToast({header: 'Loading exams', message: 'Exams not loaded successfully', className: 'bg-danger'})
      })
  }

  buildForm() {
    this.examsForm = this.fb.group({
      exams: [, Validators.required]
    });
  }

  applyExams() {
    const exams: Exam[] = {...this.examsForm?.get('exams')?.value};
    console.log(JSON.stringify(exams));
    
    // if (this.user) {
    //   this.httpExam.applyExams(exams, this.user)
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe({
    //     next: () => {
    //       this.toastService.showToast({header: 'Applying', message:'Exams applied successfully'});
    //       this.router.navigate(['/home']);
    //     },
    //     error: () => this.toastService.showToast({header: 'Applying', message:'Exams not applied', className: 'bg-danger'})
    //   });
    // }
  }

  hasErrors(componentName: string, errorCode?: string) {
    return  (this.examsForm?.get(componentName)?.dirty || this.examsForm?.get(componentName)?.touched) &&
    ((!errorCode && this.examsForm?.get(componentName)?.errors ) ||
    (errorCode && this.examsForm?.get(componentName)?.hasError(errorCode)));
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}
