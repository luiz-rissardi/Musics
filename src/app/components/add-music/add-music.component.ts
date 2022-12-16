import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IPlayList } from 'src/app/Interfaces/IPlayList';
import { IUser } from 'src/app/Interfaces/IUser';
import { UserService } from 'src/app/services/user.service';
import { ITrack } from 'src/app/Interfaces/Track';
import { ApiService } from 'src/app/services/api.service';
import { EmiterService } from 'src/app/services/emiter.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html',
  styleUrls: ['./add-music.component.scss']
})
export class AddMusicComponent implements OnInit {

  PlayList?:IPlayList;
  Tracks:ITrack [] = [];
  AudioDb: Array<HTMLAudioElement> = [];
  Player: boolean = true;
  User?:IUser;
  id?:number;
  visivel: Array<Boolean> = [];
  readonly subject = new Subject<string | undefined>()
  constructor(private routes:ActivatedRoute,private service: UserService,private API:ApiService,private emiter: EmiterService) {}

  ngOnInit(): void {
    this.routes.queryParams.subscribe(async (parans:any)=>{
      this.User = await this.service.getId(parans.id);
      this.id = parans.playlistId;
      this.User?.playlists.map((el:IPlayList,index:number)=>{
        if(el.id == this.id){
            this.PlayList = el
        }
      })
    })
    this.OnloadMusic();

    this.subject.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((value: any) => {
        if (value) {
          return this.API.Search(value)
        } else {
          return this.API.Search("pop")
        }
      })
    ).subscribe((results: any) => {
      try {
        for (let item of this.Tracks) {
          this.AudioDb[item.id].pause()
        }
      } catch (error) {
        console.log(error)
      }
      results.tracks.hits.map(async (el: any, i: number) => {
        this.Tracks[i].title = el.track.title
        this.Tracks[i].url = el.track.hub.actions[1].uri
        this.Tracks[i].imgTab = el.track.images.coverarthq
        this.Tracks[i].banda = el.track.images.background
        this.Tracks[i].id = el.track.key
      })
      for (let item of this.Tracks) {
        this.AudioDb[item.id] = new Audio(item.url)
      }
    })
  }

  Play(id: number) {
    let track;
    if (this.Player) {
      let arr = [];
      for (let item of this.Tracks) {
        if(item.id == id){
          track = item
        }
        try {
          this.AudioDb[item.id].pause()
          arr.push(this.AudioDb[item.id])
        } catch (error) {
          console.log(error)
        }
      }
      try {
        this.AudioDb[id].currentTime = 0
        this.emiter.send({audio: this.AudioDb[id], dbAudio:arr,Track:track,Tracks:this.Tracks})
      } catch (error) {
        console.log(error)
      }
    }
    this.Player = true
  }

  SearchInput(event: any) {
    let searchQuery = (event.target as HTMLInputElement).value;
    this.subject.next(searchQuery.trim());
  }


  add(track:ITrack){
    this.Player = false
    let add = true
    this.PlayList?.musics.map((el:ITrack)=>{
      if(track.id == el.id){
        add = false
      }
    })
    if(add && this.User){
      this.PlayList?.musics.push(track);
      this.service.AtualizarUser(this.User)
    }
  }

  async OnloadMusic() {
    const dados = await this.API.Autoload();
    if (this.Tracks && dados) {
      this.Tracks = dados
    }
    for (let item of this.Tracks) {
      this.AudioDb[item.id] = new Audio(item.url)
    }
  }

  Curte(id: number, track: ITrack) {
    this.Player = false
    if (this.User) {
      const data = document.getElementById(id.toString());
      let curtir = true;
      for (let item of this.User.Curte) {
        if (track.id == item.id) {
          data?.setAttribute("src", "../../../assets/Images/noCurte.png")
          const index = this.User.Curte.filter(el => el.id != id)
          for (let i in this.User.Curte) {
            this.User.Curte[i] = index[i];
          }
          this.User.Curte.pop();
          curtir = false
        }
      }
      if (curtir) {
        data?.setAttribute("src", "../../../assets/Images/curte.png")
        this.User.Curte.push(track);
        this.service.AtualizarUser(this.User)
      }
    }
  }

  ValidadeCurte(track: ITrack) {
    if (this.User) {
      for (let item of this.User.Curte) {
        if (item.id == track.id) {
          document.getElementById(track.id.toString())?.setAttribute("src", "../../../assets/Images/curte.png")
        }
      }
    }
    return true
  }

}
