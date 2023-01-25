import { formatDate } from '@angular/common';
import { Component, OnInit, Inject, LOCALE_ID, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ModeOptions } from 'src/app/core/enums';
import { City, Professor, Subject, Title } from 'src/app/core/models';
import { HttpCityService } from 'src/app/core/services/http-city/http-city.service';
import { HttpProfessorService } from 'src/app/core/services/http-professor/http-professor.service';
import { HttpSubjectService } from 'src/app/core/services/http-subject/http-subject.service';
import { HttpTitleService } from 'src/app/core/services/http-title/http-title.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserLoginDataService } from 'src/app/core/services/user-login-data/user-login-data.service';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.css']
})
export class ProfessorFormComponent implements OnInit, OnDestroy {
  professorForm?: FormGroup;
  mode = '';
  cities?: City[];
  titles?: Title[];
  subjects?: Subject[];
  professor?: Professor;
  subscriptions: Subscription = new Subscription();

  constructor(private httpProfessor: HttpProfessorService, 
    private httpCity: HttpCityService,
    private httpTitle: HttpTitleService,
    private httpSubject: HttpSubjectService,
    private router: Router,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastService: ToastService,
    @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.mode = this.activeRoute.snapshot.data['mode'];
    this.professor = this.activeRoute.snapshot.data['professorData'];
    this.loadCities();
    this.loadTitles();
    this.loadSubjects();
    
    this.buildForm(this.professor);
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

  loadCities() {
    this.subscriptions.add(
      this.httpCity.findAll()
        .subscribe( cities => this.cities = cities)
    );
  }

  loadTitles() {
    this.subscriptions.add(
      this.httpTitle.findAll()
        .subscribe( titles => this.titles = titles)
    );
  }

  loadSubjects() {
    this.subscriptions.add(
      this.httpSubject.findAllSubjectsWithNoProfessor()
        .subscribe( subjects => this.subjects = subjects)
    );
  }

  buildForm(professor?: Professor) {
    this.professorForm = this.fb.group({
      username: [professor?.username, Validators.required],
      password: [professor?.password, Validators.required],
      firstName: [professor?.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: [professor?.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [professor?.email, [Validators.required, Validators.email]],
      address: [professor?.address, [Validators.minLength(3), Validators.maxLength(50)]],
      city: [professor?.city],
      phone: [professor?.phone, [Validators.minLength(9), Validators.maxLength(15), Validators.pattern("^[0-9]*$")]],
      reelectionDate: [professor?.reelectionDate, Validators.required],
      title: [professor?.title, Validators.required],
      subjects: [professor?.subjects]
    });
  }

  saveProfessor() {
    const professor: Professor = {...this.professorForm?.getRawValue()};
    professor.reelectionDate = formatDate(this.professorForm?.get('reelectionDate')?.value, 'dd.MM.yyyy', this.locale);
    this.subscriptions.add(
      this.createOrUpdateProfessor(professor)
        .subscribe({
          next: () => {
            this.toastService.showToast({header: 'Saving professor', message: 'Professor saved succcessfully'});
            this.router.navigate(['professor']);
          },
          error: () => this.toastService.showToast({header: 'Deleting professor', message: 'Professor not deleted', className: 'bg-danger'})
        })
    );
  }

  createOrUpdateProfessor(professor: Professor): Observable<Professor> {
    return this.mode === ModeOptions.ADD ? this.httpProfessor.addProfessor(professor) : this.httpProfessor.updateProfessor(professor);
  }

  onCancel() {
    this.router.navigate(['/professor/list']);
  }

  hasErrors(componentName: string, errorCode?: string) {
    return  (this.professorForm?.get(componentName)?.dirty || this.professorForm?.get(componentName)?.touched) &&
    ((!errorCode && this.professorForm?.get(componentName)?.errors ) ||
    (errorCode && this.professorForm?.get(componentName)?.hasError(errorCode)));
  }

  compareTitle(first?: Title, second?: Title): boolean {
    return first?.id === second?.id;
  }

  compareCity(first?: City, second?: City): boolean {
    return first?.postalCode === second?.postalCode;
  }

  compareSubject(first?: Subject, second?: Subject): boolean {
    return first?.id === second?.id;
  }
}
