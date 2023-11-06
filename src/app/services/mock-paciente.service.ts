import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockPacienteService {

constructor() { }

  // Método para salvar uma entidade no localStorage
  saveEntity(entity: any, key: string): void {
    const entityString = JSON.stringify(entity);
    localStorage.setItem(key, entityString);
  }

  // Método para obter uma entidade do localStorage
  getEntity(key: string): any {
    const entityString = localStorage.getItem(key);
    if (entityString) {
      return JSON.parse(entityString);
    }
    return null;
  }

  // Método para remover uma entidade do localStorage
  removeEntity(key: string): void {
    localStorage.removeItem(key);
  }
}
