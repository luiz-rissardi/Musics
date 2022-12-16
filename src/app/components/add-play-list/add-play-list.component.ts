
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/Interfaces/IUser';
import { IPlayList } from 'src/app/Interfaces/IPlayList';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-play-list',
  templateUrl: './add-play-list.component.html',
  styleUrls: ['./add-play-list.component.scss']
})
export class AddPlayListComponent implements OnInit {

  User?: IUser;
  Form: FormGroup;
  PlayList: IPlayList = {
    playlistName: '',
    PlayListImg: '',
    id:0,
    musics: [{
      title: "",
      url: "",
      imgTab: "",
      banda: "",
      id:0
    }]
  };
  id?:number;
  constructor(private routes: ActivatedRoute, private form: FormBuilder, private service: UserService, private Router: Router) {
    this.Form = form.group({
      namePlayList: [],
      nameMusic: [],
    })
  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe(async (dados: any) => {
      if (dados) {
        this.User = await this.service.getId(dados.id);
        try {
          const index = this.User.playlists.length -1;
        if(this.User){
          this.id = this.User.playlists[Number(index)].id + 1
        }
        } catch (error) {
          this.id = 0
        }
      }
    })

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
          if (image && img) {
            let final = img.toString();
            image.setAttribute("src", final);
            getImage(final)
          }
        }
        r.readAsDataURL(img);
      }
    })
    const getImage = (url: string) => {
      if (this.PlayList) {
        this.PlayList.PlayListImg = url
      }
    }
  }

  salvarPLayList() {
    if(this.id){
      this.id = this.id
    }else{
      this.id = 0;
    }
    if (this.User) {
      if (this.PlayList) {
        this.PlayList.playlistName = this.Form.get("namePlayList")?.value;
        if(this.PlayList.PlayListImg == ""){
          this.PlayList.PlayListImg = "../../../assets/Images/5eec91792500006a2eeb3a4f.webp";
        }
        if(this.PlayList.playlistName == null){
          this.PlayList.playlistName = "playlist "+ this.User.playlists.length ;
        }
        this.PlayList.id = this.id;
        this.PlayList.musics.pop()
        this.User.playlists.push(this.PlayList);
        this.service.AtualizarUser(this.User);
      }
    }
    setTimeout(()=>{this.Router.navigate(["/PlayList"], { queryParams: { id: this.User?.id } })},200)
  }
}
