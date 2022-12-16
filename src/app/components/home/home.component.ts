import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ITrack } from 'src/app/Interfaces/Track';
import { IUser } from 'src/app/Interfaces/IUser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EmiterService } from 'src/app/services/emiter.service';
import { IPlayList } from 'src/app/Interfaces/IPlayList';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  active = 0;
  Tracks: ITrack[] = [];
  User?: IUser;
  visivel: Array<Boolean> = [];
  Player: boolean = true;
  AudioDb: Array<HTMLAudioElement> = [];
  TopPlaylist: IPlayList[] = []
  readonly subject = new Subject<string | undefined>()
  constructor(private Service: ApiService, private routes: ActivatedRoute, private userService: UserService, private emiter: EmiterService) {
  }

  ngOnInit(): void {
    this.subject.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((value: any) => {
        if (value) {
          return this.Service.Search(value)
        } else {
          return this.Service.Search("pop")
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
      results.tracks.hits.map((el: any, i: number) => {
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

    this.OnloadMusic();

    this.routes.queryParams.subscribe(async (data: any) => {
      this.User = await this.userService.getId(data.id);
      for (let i = 0; i < 3; i++) {
        if (this.User.playlists[i]) {
          this.TopPlaylist.push(this.User.playlists[i])
        }
      }
    })
  }


  async OnloadMusic() {
    const dados = await this.Service.Autoload();
    if (this.Tracks && dados) {
      this.Tracks = dados
    }
    for (let item of this.Tracks) {
      this.AudioDb[item.id] = new Audio(item.url)
    }
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
        this.userService.AtualizarUser(this.User)
      }
    }
  }

  SearchInput(event: any) {
    let searchQuery = (event.target as HTMLInputElement).value;
    this.subject.next(searchQuery.trim());
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