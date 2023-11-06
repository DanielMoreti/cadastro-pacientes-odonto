/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CountCadastroPacienteService } from './count-cadastro-paciente.service';

describe('Service: CountCadastroPaciente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountCadastroPacienteService]
    });
  });

  it('should ...', inject([CountCadastroPacienteService], (service: CountCadastroPacienteService) => {
    expect(service).toBeTruthy();
  }));
});
