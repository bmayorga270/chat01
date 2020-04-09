import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Mensaje } from 'src/app/objects/clases';
 

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private socket: Socket) { }
 
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



 