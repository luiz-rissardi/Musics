import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redefinirsenha',
  templateUrl: './redefinirsenha.component.html',
  styleUrls: ['./redefinirsenha.component.scss']
})
export class RedefinirsenhaComponent implements OnInit {

  Form:FormGroup;
  Validation:any = 1;
  constructor(private form:FormBuilder,private Service:UserService,private router:Router) {
    this.Form = form.group({
     username:[],
     password:[]
    })
  }

  ngOnInit(): void {
  }

  async Redefinir(){
    const nome = this.Form.get("username")?.value;
    const senha = this.Form.get("password")?.value;
    this.Validation = await this.Service.Redefinir(nome,senha);
    if(this.Validation)
    {
      this.router.navigate(['/login'])
    }
  }

}
