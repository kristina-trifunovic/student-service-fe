import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User, Student, Professor, Subject } from 'src/app/core/models';
import { HttpProfessorService } from 'src/app/core/services/http-professor/http-professor.service';
import { HttpStudentService } from 'src/app/core/services/http-student/http-student.service';
import { HttpSubjectService } from 'src/app/core/services/http-subject/http-subject.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserLoginDataService } from 'src/app/core/services/user-login-data/user-login-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user?: User;
  student?: Student;
  professor?: Professor;
  subscriptions = new Subscription();
  errors: string[] = [];
  isAdmin?: boolean;
  literature?: File;
  subject?: Subject;

  constructor(private httpStudent: HttpStudentService,
    private httpProfessor: HttpProfessorService,
    private httpSubject: HttpSubjectService,
    private userLoginData: UserLoginDataService,
    private modalService: NgbModal,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.user = this.userLoginData.userLoggedIn;
    this.isAdmin = true;
    this.loadStudent();
    this.loadProfessor();
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

  loadStudent() {
    this.subscriptions.add(
      this.httpStudent.findById(this.user?.username)
        .subscribe({
          next: response => {
            this.student = response;
            this.isAdmin = false;            
          },
          error: error => this.errors.push(error)
        })
    );
  }

  loadProfessor() {
    this.subscriptions.add(
      this.httpProfessor.findById(this.user?.username)
        .subscribe({
          next: response => {
            this.professor = response;
            this.isAdmin = false;
          },
          error: error => this.errors.push(error)
        })
    );
  }

  openAddLiterature(modal: any, subject: Subject) {
    this.modalService.open(modal);
    this.subject = subject;
  }

  onUploadLiterature(event: any) {
    this.literature = event.target.files[0];
  }

  uploadLiteratureToSubject() {
    const formData: FormData = new FormData();
    formData.append('literature', this.literature!);
    this.httpSubject.uploadLiteratureToSubject(formData, this.subject)
      .subscribe({
        next: () => this.toastService.showToast({header: 'Uploading literature', message: 'Literature uploaded successfully'}),
        error: () => this.toastService.showToast({header: 'Uploading literature', message: 'Literature not added successfully', className: 'bg-danger'})
      }
    );
  }
}
