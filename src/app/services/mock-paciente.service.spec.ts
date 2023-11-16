/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockPacienteService } from './mock-paciente.service';

describe('Service: MockPaciente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockPacienteService]
    });
  });

  it('should ...', inject([MockPacienteService], (service: MockPacienteService) => {
    expect(service).toBeTruthy();
  }));
});
