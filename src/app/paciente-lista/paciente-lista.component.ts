import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-lista',
  templateUrl: './paciente-lista.component.html',
  styleUrls: ['./paciente-lista.component.css']
})
export class PacienteListaComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  pacientes: any[] = [
    { nome: 'Paciente 1', idade: 30, email: 'paciente1@example.com', telefone: '123-456-7890' },
    { nome: 'Paciente 2', idade: 25, email: 'paciente2@example.com', telefone: '987-654-3210' },
  ];

  redirecionarParaCadastro() {
    this.router.navigate(['/cadastro-paciente']);
  }
}
