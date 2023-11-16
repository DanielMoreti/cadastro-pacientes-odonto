import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from '../services/paciente.service';
import { CountCadastroPacienteService } from '../services/count-cadastro-paciente.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Paciente {
  id?: number;
  nome: string;
  idade: number;
  email: string;
  telefone: string;
  endereco: string;
}


const ELEMENT_DATA: Paciente[] = [
  { id: 1, nome: 'Daniel', idade: 30, email: 'daniel@example.com', telefone: '123-456-7890', endereco: '' },
  { id: 2, nome: 'Ana', idade: 30, email: 'ana@example.com', telefone: '123-456-7890', endereco: '' },
  { id: 3, nome: 'Elena', idade: 30, email: 'elena@example.com', telefone: '123-456-7890', endereco: '' },
  { id: 4, nome: 'Pedro', idade: 30, email: 'pedro@example.com', telefone: '123-456-7890', endereco: '' }
];

@Component({
  selector: 'app-paciente-lista',
  templateUrl: './paciente-lista.component.html',
  styleUrls: ['./paciente-lista.component.css']
})
export class PacienteListaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'email', 'idade', 'telefone', 'opcoes'];
  dataSource: Paciente[] = [];
  public numeroAleatorio: number;

  constructor(private router: Router, private _pacienteService: PacienteService, private _countCadastroPacienteService: CountCadastroPacienteService) { }


  ngOnInit() {
    this.consultaListaPacientes();
    this._countCadastroPacienteService.asObservable().subscribe((el: number) => {
      console.log(el);

      this.numeroAleatorio = el;
    })
  }

  private consultaListaPacientes(): void {
    this._pacienteService.getPacientes()
      .subscribe({
        next: (data) => this.dataSource = data,
        error: (e) => console.error('Erro ao buscar dados:', e),
        complete: () => console.info('complete')
      });
  }

  public deletaPaciente(id_paciente: number): void {
    this._pacienteService.deletePaciente(id_paciente)
      .subscribe({
        next: () => this.consultaListaPacientes(),
        error: (e) => console.error('Erro ao buscar dados:', e),
        complete: () => console.info('complete')
      });
  }

  pacientes: any[] = [
    { nome: 'Paciente 1', idade: 30, email: 'paciente1@example.com', telefone: '123-456-7890' },
    { nome: 'Paciente 2', idade: 25, email: 'paciente2@example.com', telefone: '987-654-3210' },
  ];

  redirecionarParaCadastro() {
    this.router.navigate(['/cadastro-paciente']);
  }
}
