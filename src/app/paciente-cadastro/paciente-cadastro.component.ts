import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PacienteCadastroEnderecoComponent } from '../paciente-cadastro-endereco/paciente-cadastro-endereco.component';
import { ActivatedRoute } from '@angular/router';

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

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute) {

  }

  ngAfterViewInit() {
    this.childComponent.validarServicoOnline();
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(`ID: ${id}`);
    });


    this.cadastroPacienteFormGroup = new FormGroup({
      nomeFormControl: new FormControl('', [Validators.required]),
      idadeFormControl: new FormControl('', [Validators.required]),
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      telefoneFormControl: new FormControl('', [Validators.required]),
      enderecoFormControl: new FormControl('', [Validators.required]),
    });
  }

  paciente: any = {};

  cadastrarPaciente() {
    console.log('Paciente cadastrado:', this.paciente);

    this.paciente = {};
  }
}
