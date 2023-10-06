import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteCadastroComponent } from './paciente-cadastro/paciente-cadastro.component';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';

const routes: Routes = [
  { path: 'cadastro-paciente', component: PacienteCadastroComponent },
  { path: 'lista-pacientes', component: PacienteListaComponent },
  { path: '', redirectTo: '/lista-pacientes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
