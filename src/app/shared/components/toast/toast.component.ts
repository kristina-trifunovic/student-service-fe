import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor(private toastService: ToastService) { }

  ngOnInit(): void { }

  get toasts() {
    return this.toastService.toasts;
  }

  removeToast(index: number) {
    this.toasts.splice(index, 1);
  }

}
