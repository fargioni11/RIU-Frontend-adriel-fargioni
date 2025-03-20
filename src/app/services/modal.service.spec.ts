import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { provideHttpClient } from '@angular/common/http';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ModalService, provideHttpClient()],
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
