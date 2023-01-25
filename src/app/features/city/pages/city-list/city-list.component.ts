import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmOption } from 'src/app/core/enums';
import { City } from 'src/app/core/models';
import { PageRequest } from 'src/app/core/models/page-request.dto';
import { HttpCityService } from 'src/app/core/services/http-city/http-city.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cities?: City[];
  cityToShow?: City;
  destroy$: Subject<boolean> = new Subject();

  pageInfo: PageRequest = {pageNo: 1, pageSize:5, totalItems: 10, sortBy: 'postalCode', sortOrder:'asc'};
  availablePageSizes = [2, 3, 5, 10];

  constructor(private httpCity: HttpCityService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private toastService: ToastService,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    const pageNoParam = Number(this.activeRoute.snapshot.queryParamMap.get('pageNo'));
    if (pageNoParam) {
      this.pageInfo.pageNo = pageNoParam;
      this.pageInfo.pageSize =  Number(this.activeRoute.snapshot.queryParamMap.get('pageSize'));
    }
    this.loadCities();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  loadCities() {
      this.httpCity.findPage(this.pageInfo)
      .pipe(takeUntil(this.destroy$))
        .subscribe( cityPage => {
          this.cities = cityPage.content;
          this.pageInfo.totalItems = cityPage.totalElements;
          this.pageInfo.pageSize = cityPage.size;
          this.pageInfo.pageNo = cityPage.number + 1;
          this.toastService.showToast({header: 'Loading cities', message:'Cities loaded successfully'})
        })
  }

  onPageSizeChange() {
    this.pageInfo.pageNo = 1;
    this.loadCities();
  }

  onPageChange() {
    this.loadCities();
  }

  openDetails(modal: any, city: City) {
    this.modalService.open(modal);
    this.cityToShow = city;
  }

  onEditCity(id: number) {
    this.router.navigate([`/city/form/${id}`]);
  }

  onDelete(city: City) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.message = this.translateService.instant('COMMON.DELETE_CONFIRM_DIALOG.MESSAGE', {entityName: 'city', objectDetails: city.name});
    modalRef.componentInstance.headerText = this.translateService.instant('COMMON.DELETE_CONFIRM_DIALOG.TITLE', {entityName: 'city'});
    modalRef.result.then(
      result => result === ConfirmOption.OK && this.deleteSelectedCity(city)
    )
  }

  deleteSelectedCity(city: City) {
    this.httpCity.deleteCity(city)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      {
        next: () =>  {
          this.toastService.showToast({header: 'Deleting city', message: 'City deleted successfully'});
          this.loadCities();
        },
        error: () =>  this.toastService.showToast({header: 'Deleting city', message: 'City was not deleted', className:'bg-danger'})
      }
    )
  }

}
