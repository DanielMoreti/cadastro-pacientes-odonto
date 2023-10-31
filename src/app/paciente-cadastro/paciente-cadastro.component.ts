import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PacienteCadastroEnderecoComponent } from '../paciente-cadastro-endereco/paciente-cadastro-endereco.component';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../services/paciente.service';
import { Pacinete } from '../paciente-lista/paciente-lista.component';

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
export class PacienteCadastroComponent implements OnInit {

  @Output() cadastroPacienteFormGroup: FormGroup;
  @ViewChild(PacienteCadastroEnderecoComponent) childComponent: PacienteCadastroEnderecoComponent;
  mockPacienteLocalStorage: Pacinete;

  matcher = new MyErrorStateMatcher();
  paciente: any = {};

  constructor(private route: ActivatedRoute, private pacienteService: PacienteService) {

  }

  ngAfterViewInit() {
    this.childComponent.validarServicoOnline();
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params['id'];
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

  mostrarInformacaoCadastroTemporario() {
    this.mockPacienteLocalStorage = this.getPaciente();
  }

  public cadastrarPaciente(): void {
    var paciente: Pacinete = {
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

  private savePaciente(pacinte: Pacinete): void {
    const entity = pacinte;
    this.pacienteService.saveEntity(entity, 'minhaEntidade');
  }

  // Método para obter uma entidade do localStorage
  private getPaciente(): Pacinete {
    const entity = this.pacienteService.getEntity('minhaEntidade');
    return entity;
  }

  // Método para remover uma entidade do localStorage
  private removePaciente(): void {
    this.pacienteService.removeEntity('minhaEntidade');
  }
}
