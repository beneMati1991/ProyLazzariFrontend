import { TestBed } from '@angular/core/testing';

import { DatosGeograficosService } from './datos-geograficos.service';

describe('DatosGeograficosService', () => {
  let service: DatosGeograficosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosGeograficosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
