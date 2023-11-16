import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountCadastroPacienteService {

  private countSource = new Subject<number>();
  private countObservable = this.countSource.asObservable();

  constructor() { }

  adicionaMaisUmNoContador() {
    setTimeout(() => {
      var numeroAleatorio = Math.floor(Math.random() * 100) + 1;
      this.countSource.next(numeroAleatorio);
    }, 100)

  }

  asObservable(): Observable<number> {
    return this.countObservable;
  }
}
