import { Component, OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';
import { EmiterService } from 'src/app/services/emiter.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})

export class PerfilUsuarioComponent implements OnInit {

  @Input() User?:any;
  dropdown:boolean = false
  constructor(private routes:Router,private emiter:EmiterService) { }

  ngOnInit(): void {
    const data = document.getElementById("image")
    if(this.User.ImgUser != ""){
      data?.setAttribute("src",this.User.ImgUser);
    }
  }

  close(){
    this.emiter.send({stopall:false})
    this.routes.navigate(["/login"])
  }

  navegar(){
    this.routes.navigate(["edit"],{queryParams:{id:this.User.id}})
  }

  curtidas(){
    this.routes.navigate(["curtidas"],{queryParams:{id:this.User.id}})
  }

}
