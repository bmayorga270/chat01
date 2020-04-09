import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/objects/clases';
import { UsersService } from '../users/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuario: string;
  mensaje: string;
  Mensajes: Mensaje[];
  MensajesUsuario: Mensaje[];
  Usuarios: string[];
  mnsg: Mensaje;
  constructor(private userService: UsersService, private route: ActivatedRoute) { 
    this.mnsg = new Mensaje();
    this.Mensajes = [];
    this.Usuarios = [];
    
  }

  ngOnInit() {
    this.mnsg.Usuario = 'sdxadmin';
    this.userService.ingresarUsuario(this.mnsg.Usuario);
    this.userService
    .getMessages()
    .subscribe((message: Mensaje) => {    
      this.Mensajes.push(message);
      this.Usuarios.push(message.Usuario);
      console.log('getMessages');
      console.log(message);
      if (this.usuario === message.Usuario) {
        this.MensajesUsuario.push(message);
      }
    });
  
  }

/**********METODO GROUP BY NGFOR********* */
  objectKey(obj) {
    return Object.keys(obj);
  }

  formatedCerts() {
      return this.Usuarios.reduce((prev, now) => {
        if (!prev[now]) {
          prev[now] = [];
        }

        prev[now].push(now);
        return prev;
      }, {});
  }
/**********FIN METODO GROUP BY NGFOR******* */


  ingresarChat(mensaje_user){
    this.usuario = mensaje_user;
    console.log(mensaje_user);
    this.MensajesUsuario = [];
    for (let i = 0; i < this.Mensajes.length; i++) {
      if (this.Mensajes[i].Usuario === mensaje_user) {
        this.MensajesUsuario.push(this.Mensajes[i]);
      }
    }
  }

  enviarMensaje(mensaje){
    this.mnsg.Mensaje = mensaje;
    this.mnsg.Usuario =this.usuario;
    this.mnsg.Icono ='icon-seadex.PNG';
    this.userService.sendMessage(this.mnsg);
    this.mensaje = '';   
  }

}
