import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/Interfaces/IUser';
import { ActivatedRoute,Router} from '@angular/router';
import { IPlayList } from 'src/app/Interfaces/IPlayList';
import { ITrack } from 'src/app/Interfaces/Track';
import { EmiterService } from 'src/app/services/emiter.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})

export class PlaylistComponent implements OnInit {

  Form:FormGroup;
  User?:IUser;
  playlist?:IPlayList;
  visivel:Array<Boolean> = []
  AudioDb: Array<HTMLAudioElement> = [];
  id:number = 0;
  modal = false
  constructor(private form:FormBuilder,private service:UserService,private router:ActivatedRoute,private Router:Router,private emiter:EmiterService) { 
    this.Form = form.group({
      searchPlayList:[],
      namePlayList:[],
    })
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(async (dados:any)=>{
      this.User = await this.service.getId(dados.id);
    })
  }

  open(id:number){
    this.id = id;
    const playlist = this.User?.playlists.filter(el => el.id == id)[0];
    this.playlist = playlist;
    const data = document.getElementById("FileImgPlayList");
    const image = document.getElementById("imagePlayList");
    if(playlist){
      image?.setAttribute("src",playlist?.PlayListImg);
    }
    this.modal = true
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
            getImage(final,id)
            image.setAttribute("src", final);
          }
        }
        r.readAsDataURL(img2);
      }
    })
    const getImage = (url:string,id:number)=>{
      if(this.User){
        for(let item of this.User.playlists){
          if(item.id == id){
            item.PlayListImg = url
          }
        }
      }
    }
  }

  save(id:number){
    if(this.User){
      if(this.Form.get("namePlayList")?.value != null){
        for(let item of this.User.playlists){
          if(item.id == id){
            item.playlistName = this.Form.get("namePlayList")?.value
          }
        }
      }
      this.service.AtualizarUser(this.User);
      this.modal = false
    }
  }

  remove(id:number){
    if(this.User){
      this.service.remove(this.User,id);
    }
  }

  nextMusic(id:number,track:ITrack,playlist:IPlayList){
    return ()=>{
      this.emiter.send({ audio: this.AudioDb[id], dbAudio: this.AudioDb,Track:track,Tracks:playlist.musics})
    }
  }

  playMusics(playlist:IPlayList){
    this.AudioDb = []
    playlist.musics.map((el:ITrack,index)=>{
      this.AudioDb[index] = new Audio(el.url);
    })
    for(let item of this.AudioDb){
      item.pause();
    }

    playlist.musics.map((el:ITrack,index)=>{
      if(this.AudioDb[index + 1]){
        this.AudioDb[index].addEventListener("ended",this.nextMusic(index +1,playlist.musics[index + 1],playlist))
        this.AudioDb[index].addEventListener("error",this.nextMusic(index +1,playlist.musics[index + 1],playlist))
      }
      else{
        this.AudioDb[index].addEventListener("ended",this.nextMusic(0,el,playlist))
        this.AudioDb[index].addEventListener("error",this.nextMusic(0,el,playlist))
      }
    })
    this.emiter.send({audio: this.AudioDb[0], dbAudio:this.AudioDb,Track:playlist.musics[0],Tracks:playlist.musics})
  }

  removeMusic(track:ITrack){
    const index = this.playlist?.musics.filter(el => el.id != track.id)
    for (let i in this.playlist?.musics) {
     if(this.playlist && index){
      this.playlist.musics[Number(i)] = index[Number(i)];
     }
    }
    this.playlist?.musics.pop()
    if(this.User){
      this.service.AtualizarUser(this.User)
    }
  }
}
