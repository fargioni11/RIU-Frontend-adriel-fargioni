import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const spinnerSRV = inject(SpinnerService);
  spinnerSRV.showSpinner();
  return next(req).pipe(
    finalize(()=> spinnerSRV.hideSpinner())
  )
};
