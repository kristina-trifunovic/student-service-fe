import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ActiveOptions, ModeOptions, Semester } from 'src/app/core/enums';
import { Subject } from 'src/app/core/models';
import { HttpSubjectService } from 'src/app/core/services/http-subject/http-subject.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit, OnDestroy {
  mode = '';
  subjectForm?: FormGroup;
  semesterOptions = Semester;
  semesterOptionsAsString = Object.values(Semester);
  subscriptions: Subscription = new Subscription();

  constructor(private httpSubject: HttpSubjectService,
    private router: Router,
      private fb: FormBuilder,
      private activeRoute: ActivatedRoute,
      private toastService: ToastService) { }

  ngOnInit(): void {
    this.mode = this.activeRoute.snapshot.data['mode'];
    const subject = this.activeRoute.snapshot.data['studentData'];
    this.buildForm(subject);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  buildForm(subject?: Subject) {
    this.subjectForm = this.fb.group({
      id: [subject?.id, Validators.required],
      name: [subject?.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: [subject?.description, [Validators.maxLength(200)]],
      noOfEsp: [subject?.noOfEsp, [Validators.required, Validators.max(9)]],
      yearOfStudy: [subject?.yearOfStudy, [Validators.required, Validators.max(9)]],
      semester: [subject?.semester, [Validators.required]]
    });
  }

  saveSubject() {
    const subject = {...this.subjectForm?.getRawValue()};
    this.subscriptions.add(
      this.createOrUpdateSubject(subject)
        .subscribe({
          next: () => {
            this.toastService.showToast({header: 'Saving subject', message: 'Subject saved successfully'});
            this.router.navigate(['subject']);
          },
          error: () => this.toastService.showToast({header: 'Saving subject', message: 'Subject not saved', className: 'bg-danger'})
        })
    );

  }

  createOrUpdateSubject(subject: Subject): Observable<Subject> {
    return this.mode === ModeOptions.ADD ? this.httpSubject.addSubject(subject) : this.httpSubject.updateSubject(subject);
  }

  onCancel() {
    this.router.navigate(['subject']);
  }

  hasErrors(componentName: string, errorCode?: string) {
    return  (this.subjectForm?.get(componentName)?.dirty || this.subjectForm?.get(componentName)?.touched) &&
    ((!errorCode && this.subjectForm?.get(componentName)?.errors ) ||
    (errorCode && this.subjectForm?.get(componentName)?.hasError(errorCode)));
  }
}
