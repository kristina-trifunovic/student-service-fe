import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModeOptions } from 'src/app/core/enums';
import { City } from 'src/app/core/models';
import { HttpCityService } from 'src/app/core/services/http-city/http-city.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit {
  cityForm?: FormGroup;
  mode = '';

  constructor(private fb: FormBuilder, 
      private activatedRoute: ActivatedRoute, 
      private httpCity: HttpCityService, 
      private router: Router,
      private toastService: ToastService) {
    const city = activatedRoute.snapshot.data['cityData'];
    this.mode = activatedRoute.snapshot.data['mode'];
    this.buildForm(city);
  }

  ngOnInit(): void {
  }

  buildForm(city?: City) {
    this.cityForm = this.fb.group({
      postalCode: [city?.postalCode, [Validators.required, Validators.min(10000), Validators.max(99999)]],
      name: [city?.name, [Validators.required, Validators.minLength(2)]]
    });
    if(city) {
      this.cityForm.get('postalCode')?.disable();
    }
  }

  saveCity() {
    const city: City = {...this.cityForm?.getRawValue()};
    this.createOrUpdateCity(city).subscribe({
      next: () => {
        this.toastService.showToast({header: 'Saving city', message:'City saved successfully'});
        this.router.navigate(['city']);
      },
      error: () => this.toastService.showToast({header: 'Deleting city', message: 'City not deleted', className: 'bg-danger'})
    });
  }

  createOrUpdateCity(city: City): Observable<City> {
    return this.mode === ModeOptions.ADD ? this.httpCity.addCity(city) : this.httpCity.updateCity(city);
  }

  onCancel() {
    this.router.navigate(['city']);
  }

  hasErrors(componentName: string, errorCode?: string) {
    return  (this.cityForm?.get(componentName)?.dirty || this.cityForm?.get(componentName)?.touched) &&
    ((!errorCode && this.cityForm?.get(componentName)?.errors ) ||
    (errorCode && this.cityForm?.get(componentName)?.hasError(errorCode)));
  }

}

