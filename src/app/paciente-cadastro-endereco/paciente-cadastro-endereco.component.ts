import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from '../paciente-cadastro/paciente-cadastro.component';

@Component({
  selector: 'app-paciente-cadastro-endereco',
  templateUrl: './paciente-cadastro-endereco.component.html',
  styleUrls: ['./paciente-cadastro-endereco.component.css']
})
export class PacienteCadastroEnderecoComponent implements OnInit {

  @Input() @Output() cadastroPacienteFormGroup: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit() {

  }

  public validarServicoOnline(): void {
    console.log('O servico de consultar endereço está online');
  }
}
