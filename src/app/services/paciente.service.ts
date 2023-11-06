import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from '../paciente-lista/paciente-lista.component';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private _httpClient: HttpClient) { }

  public getPacientes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('http://localhost:3000/paciente')
        .subscribe(
          (data) => {
            resolve(data); // Resolva a Promise com os dados bem-sucedidos da solicitação HTTP
          },
          (error) => {
            reject(error); // Rejeite a Promise em caso de erro
          }
        );
    });
  }

  public getPaciente(id_paciente: Number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('http://localhost:3000/paciente' + `/${id_paciente}`)
        .subscribe(
          (data) => {
            resolve(data); // Resolva a Promise com os dados bem-sucedidos da solicitação HTTP
          },
          (error) => {
            reject(error); // Rejeite a Promise em caso de erro
          }
        );
    });
  }

  public postPaciente(paciente: Paciente): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post('http://localhost:3000/paciente', paciente)
        .subscribe(
          (data) => {
            resolve(data); // Resolva a Promise com os dados bem-sucedidos da solicitação HTTP
          },
          (error) => {
            reject(error); // Rejeite a Promise em caso de erro
          }
        );
    });
  }

  public putPaciente(paciente: Paciente): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.put('http://localhost:3000/paciente' + `/${paciente.id}`, paciente)
        .subscribe(
          (data) => {
            resolve(data); // Resolva a Promise com os dados bem-sucedidos da solicitação HTTP
          },
          (error) => {
            reject(error); // Rejeite a Promise em caso de erro
          }
        );
    });
  }

  public deletePaciente(id_paciente: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete('http://localhost:3000/paciente' + `/${id_paciente}`)
        .subscribe(
          (data) => {
            resolve(data); // Resolva a Promise com os dados bem-sucedidos da solicitação HTTP
          },
          (error) => {
            reject(error); // Rejeite a Promise em caso de erro
          }
        );
    });
  }
}
