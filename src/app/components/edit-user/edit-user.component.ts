import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Interfaces/IUser';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  User?: IUser
  Form: FormGroup;
  modal:boolean = false
  constructor(private service: UserService, private Router: ActivatedRoute, private form: FormBuilder) {
    this.Form = form.group({
      nameUser: [],
    });
  }

  ngOnInit(): void {
    this.Router.queryParams.subscribe(async (data: any) => {
      this.User = await this.service.getId(data.id);
      if (this.User.ImgUser != "") {
        document.getElementById("UserImg")?.setAttribute("src", this.User.ImgUser);
      }
    })
  }

  open() {
    this.modal = true;
    if (this.User?.ImgUser) {
      document.getElementById("image2")?.setAttribute("src", this.User.ImgUser);
    }
    const data = document.getElementById("FileImg");
    const image = document.getElementById("image2");
    data?.addEventListener("change", function (e: any) {
      const event = e.target as HTMLInputElement;
      const files = event.files;
      if (files) {
        const img2 = files[0];
        const r = new FileReader();
        r.onload = function () {
          const img = r.result;
          if (image && img) {
            let final = img.toString();
            image.setAttribute("src", final);
            getImage(final)
          }
        }
        r.readAsDataURL(img2);
      }
    })
    const getImage = (url:string) =>{
      if(this.User){
        this.User.ImgUser = url
      }
    }
  }

  salvar(){    
    if(this.User){
      if(this.Form.get("nameUser")?.value){
        this.User.nameUser = this.Form.get("nameUser")?.value
      }
      this.service.AtualizarUser(this.User);
      location.reload()

    }
  }
}

