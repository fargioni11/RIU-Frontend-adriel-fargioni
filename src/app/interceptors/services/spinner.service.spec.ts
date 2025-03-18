import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have loading state initially set to false', () => {
    expect(service.loadingState()).toBeFalse();
  });

  it('should set loading state to true when showSpinner is called', () => {
    service.showSpinner();
    expect(service.loadingState()).toBeTrue();
  });

  it('should set loading state to false when hideSpinner is called', () => {

    service.showSpinner();
    expect(service.loadingState()).toBeTrue();

    service.hideSpinner();
    expect(service.loadingState()).toBeFalse();
  });

  it('should properly toggle the loading state between true and false', () => {
    // Initial state
    expect(service.loadingState()).toBeFalse();

    service.showSpinner();
    expect(service.loadingState()).toBeTrue();

    service.hideSpinner();
    expect(service.loadingState()).toBeFalse();

    service.showSpinner();
    expect(service.loadingState()).toBeTrue();
  });
});
