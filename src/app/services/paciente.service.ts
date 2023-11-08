import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from '../paciente-lista/paciente-lista.component';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private _httpClient: HttpClient) { }

  public getPacientes(): Observable<any> {
    return this._httpClient.get('http://localhost:3000/paciente')
      .pipe(
        map(res => res)
      );
  }

  public getPaciente(id_paciente: Number): Observable<Paciente> {
    return this._httpClient.get<Paciente>('http://localhost:3000/paciente' + `/${id_paciente}`)
      .pipe(
        map(res => res)
      );
  }

  id?: number;
  nome: string;
  idade: number;
  email: string;
  telefone: string;
  endereco: string;

  public postPaciente(paciente: Paciente): Observable<any> {
    return this._httpClient.post('http://localhost:3000/paciente', paciente);
  }

  public putPaciente(paciente: Paciente): Observable<any> {
    return this._httpClient.put('http://localhost:3000/paciente' + `/${paciente.id}`, paciente);
  }

  public deletePaciente(id_paciente: number): Observable<any> {
    return this._httpClient.delete('http://localhost:3000/paciente' + `/${id_paciente}`);
  }
}