import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ModeOptions } from 'src/app/core/enums';
import { City, Student } from 'src/app/core/models';
import { HttpCityService } from 'src/app/core/services/http-city/http-city.service';
import { HttpStudentService } from 'src/app/core/services/http-student/http-student.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit, OnDestroy {
  studentForm?: FormGroup;
  mode = '';
  cities?: City[];
  destroy$: Subject<void> = new Subject();

  constructor(private httpStudent: HttpStudentService, 
      private router: Router,
      private fb: FormBuilder,
      private activeRoute: ActivatedRoute,
      private httpCity: HttpCityService,
      private toastService: ToastService) { }

  ngOnInit(): void {
    this.mode = this.activeRoute.snapshot.data['mode'];
    const student = this.activeRoute.snapshot.data['studentData'];
    this.loadCities();
    this.buildForm(student);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCities() {
    this.httpCity.findAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe( cities => this.cities = cities);
  }

  buildForm(student?: Student) {
    this.studentForm = this.fb.group({
      username: [student?.username, Validators.required],
      password: [student?.password, Validators.required],
      index: this.fb.group({
        indexNumber: [student?.index.indexNumber, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")]],
        indexYear: [student?.index.indexYear, [Validators.required, Validators.min(2000), Validators.max(2100)]]
      }),      
      firstName: [student?.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: [student?.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [student?.email, [Validators.email, Validators.maxLength(30)]],
      address: [student?.address, [Validators.minLength(3), Validators.maxLength(50)]],
      city: [student?.city],
      currentYearOfStudy: [student?.currentYearOfStudy, Validators.required]
    });
  }

  saveStudent() {
      const student: Student = {...this.studentForm?.getRawValue()};
      this.createOrUpdateStudent(student)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
        next: () => {
          this.toastService.showToast({header: 'Saving student', message:'Student saved successfully'})
          this.router.navigate(['student']);
        },
        error: () => this.toastService.showToast({header: 'Saving student', message: 'Student not saved successfully', className: 'bg-danger'})
      });
  }

  createOrUpdateStudent(student: Student) {
    return this.mode === ModeOptions.ADD ? this.httpStudent.addStudent(student) : this.httpStudent.updateStudent(student);
  }

  onCancel() {
    this.router.navigate(['student']);
  }

  hasErrors(componentName: string, errorCode?: string) {
    return  (this.studentForm?.get(componentName)?.dirty || this.studentForm?.get(componentName)?.touched) &&
    ((!errorCode && this.studentForm?.get(componentName)?.errors ) ||
    (errorCode && this.studentForm?.get(componentName)?.hasError(errorCode)));
  }

  hasErrorsSubGroup(componentName: string, subComponentName: string, errorCode?: string) {
    return  (this.studentForm?.get(componentName)?.get(subComponentName)?.dirty || this.studentForm?.get(componentName)?.get(subComponentName)?.touched) &&
    ((!errorCode && this.studentForm?.get(componentName)?.get(subComponentName)?.errors ) ||
    (errorCode && this.studentForm?.get(componentName)?.get(subComponentName)?.hasError(errorCode)));
  }

  compareCity(first?: City, second?: City): boolean {
    return first?.postalCode === second?.postalCode;
  }
  
}
