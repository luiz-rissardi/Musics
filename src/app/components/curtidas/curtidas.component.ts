import { Component, OnInit } from '@angular/core';
import { ITrack } from 'src/app/Interfaces/Track';
import { IUser } from 'src/app/Interfaces/IUser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EmiterService } from 'src/app/services/emiter.service';
import { HtmlParser } from '@angular/compiler';


@Component({
  selector: 'app-curtidas',
  templateUrl: './curtidas.component.html',
  styleUrls: ['./curtidas.component.scss']
})
export class CurtidasComponent implements OnInit {

  active = 0;
  User?: IUser;
  visivel: Array<Boolean> = [];
  Player: boolean = true;
  AudioDb: Array<HTMLAudioElement> = [];
  arr: Array<HTMLAudioElement> = []

  constructor(private routes: ActivatedRoute, private userService: UserService, private emiter: EmiterService) {
  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe(async (data: any) => {
      this.User = await this.userService.getId(data.id);
      this.User.Curte.forEach((el:ITrack,i:number)=>{
        this.AudioDb[el.id] = new Audio(el.url)
      })
    })
  }

  Play(id: number) {
    let track;
    if (this.Player && this.User) {
      for (let item of this.User.Curte) {
        if (item.id == id) {
          track = item
        }
        try {
          this.AudioDb[item.id].pause()
          this.arr.push(this.AudioDb[item.id])
        } catch (error) {
          console.log(error)
        }
      }
      try {
        this.AudioDb[id].currentTime = 0
        this.emiter.send({ audio: this.AudioDb[id], dbAudio:this.arr, Track: track, Tracks:this.User.Curte})
      } catch (error) {
        console.log(error)
      }
    }
    this.Player = true
  }

  Curte(id: number, track: ITrack) {
    this.Player = false
    let prev = 0;
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
          if(this.User){
            this.userService.AtualizarUser(this.User)
            this.emiter.send({ audio: this.arr[prev+1], dbAudio:this.arr, Track: this.User.Curte[prev], Tracks:this.User.Curte})
          }
        }
        prev++
      }
      if (curtir) {
        data?.setAttribute("src", "../../../assets/Images/curte.png")
        this.User.Curte.push(track);
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
