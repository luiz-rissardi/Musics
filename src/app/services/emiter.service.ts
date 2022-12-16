import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmiterService {

  Emiter = new EventEmitter();

  send(value:any){
    this.Emiter.emit(value)
  }
  
  constructor() { }
}
