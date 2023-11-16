import { Component, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteCadastroEnderecoComponent } from '../paciente-cadastro-endereco/paciente-cadastro-endereco.component';
import { Paciente } from '../paciente-lista/paciente-lista.component';
import { PacienteService } from '../services/paciente.service';
import { MockPacienteService } from '../services/mock-paciente.service';
import { CountCadastroPacienteService } from '../services/count-cadastro-paciente.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-paciente-cadastro',
  templateUrl: './paciente-cadastro.component.html',
  styleUrls: ['./paciente-cadastro.component.css']
})
export class PacienteCadastroComponent implements OnInit, OnDestroy {

  @Output() cadastroPacienteFormGroup: FormGroup;
  @ViewChild(PacienteCadastroEnderecoComponent) childComponent: PacienteCadastroEnderecoComponent;
  mockPacienteLocalStorage: Paciente;
  public id_paciente: number;

  matcher = new MyErrorStateMatcher();
  paciente: any = {};

  constructor(private _countCadastroPacienteService: CountCadastroPacienteService, private route: ActivatedRoute, private _pacienteService: PacienteService, private router: Router, private _mockPacienteService: MockPacienteService) {

  }

  ngAfterViewInit() {
    this.childComponent.validarServicoOnline();
  }

  ngOnDestroy(): void {
    this._countCadastroPacienteService.adicionaMaisUmNoContador();
  }


  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id_paciente = params['id'];
      if (this.id_paciente) {
        this.consultaPorIdPaciente(this.id_paciente);
      }
    });

    this.cadastroPacienteFormGroup = new FormGroup({
      nomeFormControl: new FormControl('', [Validators.required]),
      idadeFormControl: new FormControl('', [Validators.required]),
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      telefoneFormControl: new FormControl('', [Validators.required, Validators.pattern(/^\(\d{2}\)\s9?\d{4}-\d{4}$/)]),
      enderecoFormControl: new FormControl('', [Validators.required]),
    });

    this.mostrarInformacaoCadastroTemporario();
  }

  private consultaPorIdPaciente(id_paciente: Number) {
    this._pacienteService.getPaciente(id_paciente)
      .subscribe({
        next: (data) => {
          this.cadastroPacienteFormGroup.get('nomeFormControl')?.setValue(data.nome);
          this.cadastroPacienteFormGroup.get('idadeFormControl')?.setValue(data.idade);
          this.cadastroPacienteFormGroup.get('emailFormControl')?.setValue(data.email);
          this.cadastroPacienteFormGroup.get('telefoneFormControl')?.setValue(data.telefone);
          this.cadastroPacienteFormGroup.get('enderecoFormControl')?.setValue(data.endereco);
        },
        error: (e) => console.error('Erro ao buscar dados:', e),
        complete: () => console.info('complete')
      });
  }

  public cadastraPaciente(): void {
    var paciente: Paciente = {
      nome: this.cadastroPacienteFormGroup.get('nomeFormControl')?.value,
      idade: this.cadastroPacienteFormGroup.get('idadeFormControl')?.value,
      email: this.cadastroPacienteFormGroup.get('emailFormControl')?.value,
      telefone: this.cadastroPacienteFormGroup.get('telefoneFormControl')?.value,
      endereco: this.cadastroPacienteFormGroup.get('enderecoFormControl')?.value,
    }

    this._pacienteService.postPaciente(paciente)
      .subscribe({
        next: (v) => this.router.navigate(['/lista-pacientes']),
        error: (e) => console.error('Erro ao buscar dados:', e),
        complete: () => console.info('complete')
      });
  }

  public atualizaPaciente(): void {
    var paciente: Paciente = {
      id: Number(this.id_paciente),
      nome: this.cadastroPacienteFormGroup.get('nomeFormControl')?.value,
      idade: this.cadastroPacienteFormGroup.get('idadeFormControl')?.value,
      email: this.cadastroPacienteFormGroup.get('emailFormControl')?.value,
      telefone: this.cadastroPacienteFormGroup.get('telefoneFormControl')?.value,
      endereco: this.cadastroPacienteFormGroup.get('enderecoFormControl')?.value,
    }

    this._pacienteService.putPaciente(paciente)
      .subscribe({
        next: (v) => this.router.navigate(['/lista-pacientes']),
        error: (e) => console.error('Erro ao buscar dados:', e),
        complete: () => console.info('complete')
      });
  }

  public mostrarInformacaoCadastroTemporario(): void {
    this.mockPacienteLocalStorage = this.getPaciente();
  }

  public mockPaciente(): void {
    var paciente: Paciente = {
      id: 0,
      nome: this.cadastroPacienteFormGroup.get('nomeFormControl')?.value,
      idade: this.cadastroPacienteFormGroup.get('idadeFormControl')?.value,
      email: this.cadastroPacienteFormGroup.get('emailFormControl')?.value,
      telefone: this.cadastroPacienteFormGroup.get('telefoneFormControl')?.value,
      endereco: this.cadastroPacienteFormGroup.get('enderecoFormControl')?.value,
    }

    this.savePaciente(paciente);
    this.mostrarInformacaoCadastroTemporario();
  }

  private savePaciente(pacinte: Paciente): void {
    const entity = pacinte;
    this._mockPacienteService.saveEntity(entity, 'minhaEntidade');
  }

  // Método para obter uma entidade do localStorage
  private getPaciente(): Paciente {
    const entity = this._mockPacienteService.getEntity('minhaEntidade');
    return entity;
  }

  // Método para remover uma entidade do localStorage
  private removePaciente(): void {
    this._mockPacienteService.removeEntity('minhaEntidade');
  }
}
