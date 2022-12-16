import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Interfaces/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Forms:FormGroup;
  Router:Router;
  User?:IUser;
  LoginUser:UserService;
  invalidPassword:boolean = false;
  invalidUser:boolean = false;
  constructor(private form: FormBuilder,routes:Router,private login:UserService) { 
    this.Forms = form.group({
      username:[''],
      password:[''],
    });
    this.Router = routes;
    this.LoginUser = login;
  }

  ngOnInit(): void {
  }

  async Login(){
    const nome = this.Forms.get("username")?.value;
    const senha = this.Forms.get("password")?.value;
    this.invalidUser = false;
    this.invalidPassword = false;
    document.getElementById("nome")?.classList.remove("invalid-group")
    document.getElementById("password")?.classList.remove("invalid-group")
    const login = await this.LoginUser.Login(nome,senha);
    if(login != 1 && login != 2)
    {
      this.User = login;
      this.Router.navigate(['/home'],{queryParams:{id:this.User?.id}});
    }
    else if(login == 1){
      this.invalidUser = true;
      true;document.getElementById("nome")?.classList.add("invalid-group");
    }
    else
    {
      this.invalidPassword = true;
      document.getElementById("password")?.classList.add("invalid-group")
    }
  }
}
