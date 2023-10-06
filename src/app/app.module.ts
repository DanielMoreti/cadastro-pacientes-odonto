import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacienteCadastroComponent } from './paciente-cadastro/paciente-cadastro.component';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';

@NgModule({
  declarations: [		
    AppComponent,
      PacienteListaComponent,
      PacienteCadastroComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
