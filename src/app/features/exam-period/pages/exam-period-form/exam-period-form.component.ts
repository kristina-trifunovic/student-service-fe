import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ActiveOptions } from 'src/app/core/enums';
import { ExamPeriod } from 'src/app/core/models';
import { HttpExamPeriodService } from 'src/app/core/services/http-exam-period/http-exam-period.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-exam-period-form',
  templateUrl: './exam-period-form.component.html',
  styleUrls: ['./exam-period-form.component.css']
})
export class ExamPeriodFormComponent implements OnInit, OnDestroy {
  examPeriodForm?: FormGroup;
  activeOptions = ActiveOptions;
  destroy$: Subject<void> = new Subject();

  constructor(private httpExamPeriod: HttpExamPeriodService,
    private router: Router,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastService: ToastService,
    @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  buildForm() {
    this.examPeriodForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isActive: ['', Validators.required]
    });    
  }

  saveExamPeriod() {
    let examPeriod: ExamPeriod = {...this.examPeriodForm?.getRawValue()};
    if (this.validDate()) {
      examPeriod = this.fillExamPeriodValues(examPeriod);
      this.httpExamPeriod.addExamPeriod(examPeriod)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toastService.showToast({header: 'Adding exam period', message:'Exam period added successfully'})
            this.router.navigate(['/']);
          },
          error: () => this.toastService.showToast({header: 'Adding exam period', message:'Exam period not added successfully', className:'bg-danger'})
        });
    } else this.toastService.showToast({header: 'Adding exam period', message:'Invalid dates', className:'bg-danger'});
  }

  validDate(): boolean {
    const startDate = this.examPeriodForm!.get('startDate')!.value;
    const endDate = this.examPeriodForm!.get('endDate')!.value;
    if (startDate < endDate) return true;
    else return false;
  }

  fillExamPeriodValues(examPeriod: ExamPeriod): ExamPeriod {
    examPeriod.startDate = formatDate(this.examPeriodForm!.get('startDate')!.value, 'dd.MM.yyyy', this.locale);
    examPeriod.endDate = formatDate(this.examPeriodForm!.get('endDate')!.value, 'dd.MM.yyyy', this.locale);
    if (this.examPeriodForm!.get('isActive')!.value === ActiveOptions.YES) examPeriod.active = 1;
    else examPeriod.active = null;
    return examPeriod;
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  hasErrors(componentName: string, errorCode?: string) {
    return  (this.examPeriodForm?.get(componentName)?.dirty || this.examPeriodForm?.get(componentName)?.touched) &&
    ((!errorCode && this.examPeriodForm?.get(componentName)?.errors ) ||
    (errorCode && this.examPeriodForm?.get(componentName)?.hasError(errorCode)));
  }

}
