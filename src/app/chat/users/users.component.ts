import { Component, OnInit, HostListener } from '@angular/core';
import { UsersService} from './users.service'
import { Mensaje} from '../../objects/clases'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  mensaje: string;
  Mensajes: Mensaje[];
  mnsg: Mensaje;
  constructor(private userService: UsersService, private route: ActivatedRoute) { 
    this.mnsg = new Mensaje();
    this.Mensajes = [];
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.mnsg.Usuario = params.get('usr');      
      this.userService.ingresarUsuario(this.mnsg.Usuario);
    });

    
    this.userService
    .getMessages()
    .subscribe((message: Mensaje) => {
      console.log(message);
      this.Mensajes.push(message);
      document.getElementsByClassName('panel-body')[0].scrollTop = document.getElementsByClassName('panel-body')[0].scrollHeight + 348;    
      console.log(document.getElementsByClassName('panel-body')[0].scrollTop);
      console.log(document.getElementsByClassName('panel-body')[0].scrollHeight);
    });
  
  }
  enviarMensaje(mensaje){
    

    this.mnsg.Mensaje = mensaje;
    this.mnsg.Icono = 'icon-user.png';
    this.userService.sendMessage(this.mnsg);
    this.mensaje = '';   
    
  }

  onkeyEnvio(event, mensaje ){
    if(event.key === "Enter"){
      this.enviarMensaje(mensaje);
    }
  }

}
