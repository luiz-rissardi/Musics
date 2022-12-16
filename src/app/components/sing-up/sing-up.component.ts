import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/Interfaces/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  Form:FormGroup
  User:IUser = {
    nameUser: '',
    id: 0,
    password: '',
    ImgUser: '',
    playlists: [
      {playlistName: "",
        PlayListImg: "",
        id:0,
        musics:[{title:"",url: "",imgTab:"",banda:"",id:0}]
      }
    ],
    Curte:[
      {title:"",url: "",imgTab:"",banda:"",id:0}
    ]
  };

  validation:any = true;
  constructor(private form:FormBuilder,private Service:UserService,private router:Router) {
    this.Form = form.group({
      username:[],
      password:[],
    })
  }

  ngOnInit(): void {
    const data = document.getElementById("fileimg");
    const image = document.getElementById("musicImage");
    data?.addEventListener("change", function (e: any) {
      const event = e.target as HTMLInputElement;
      const files = event.files;
      if (files) {
        const img = files[0];
        const r = new FileReader();
        r.onload = function () {
          const img = r.result;
          if(image && img){
            let final = img.toString();
            getImage(final);
            image.setAttribute("src",final);
          }
        }
        r.readAsDataURL(img);
      }
    })
    const getImage = (url:string)=>{
      this.User.ImgUser = url;
    }
  }

  async Create(){
    const nome = this.Form.get("username")?.value;
    const senha = this.Form.get("password")?.value;
    this.User.nameUser = nome;
    this.User.password = senha;
    this.User.playlists[0].PlayListImg = "../../../assets/Images/5eec91792500006a2eeb3a4f.webp";
    this.User.playlists[0].playlistName = "PlayList 0";
    this.validation = await this.Service.SignIn(this.User);
    if(this.validation){
      this.router.navigate(['/login'])
    }
    
  }

}
