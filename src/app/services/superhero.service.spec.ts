import { TestBed } from '@angular/core/testing';
import { SuperheroService } from './superhero.service';
import { provideHttpClient } from '@angular/common/http';

describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [SuperheroService, provideHttpClient()],
    });
    service = TestBed.inject(SuperheroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
