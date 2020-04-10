import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Mensaje } from 'src/app/objects/clases';
 

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private socket;
  private ws_url = 'http://localhost:3000/';

  constructor() {
    this.socket = io(this.ws_url); 
   }
 
  sendMessage(msg: Mensaje){
       
    this.socket.emit("chat message", msg);
  }


  ingresarUsuario(msg: string){
    this.socket.emit("ingresarusuario", msg);
  }
  

  public getMessages = () => {
    return Observable.create((observer) => {
            this.socket.on('chat message', (message: Mensaje) => {
                observer.next(message);
            });
    });
}


}



 