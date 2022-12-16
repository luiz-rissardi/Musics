import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/Interfaces/IUser';
import { ActivatedRoute } from '@angular/router';
import { EmiterService } from 'src/app/services/emiter.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ITrack } from 'src/app/Interfaces/Track';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  User?: IUser;
  Track?: ITrack;
  Tracks: ITrack[] = []
  volume: number = 0.5;
  collapse = false;
  tela: number = window.screen.width;
  player?: HTMLAudioElement;
  DbAudio?: HTMLAudioElement[];
  Form: FormGroup;
  play: boolean = false;
  btn: string = "../../../assets/Images/pause.png";
  indice?: number;

  constructor(private service: UserService, private Route: ActivatedRoute, private emiter: EmiterService, private builder: FormBuilder) {
    this.Form = builder.group({
      range: []
    })
  }

  ngOnInit(): void {
    this.indice = 0
    this.Route.queryParams.subscribe(async (data: any) => {
      this.User = await this.service.getId(data.id);
    })
    if (this.tela > 446) {
      this.collapse = true;
    }
    this.emiter.Emiter.subscribe(data => {
      if(data.stopall == false){
        this.restart()
      }
      this.restart()
      this.play = true
      this.player = data.audio;
      this.DbAudio = data.dbAudio;
      this.Track = data.Track
      this.Tracks = data.Tracks
      this.btn = "../../../assets/Images/pause.png";
      this.Tracks.forEach((el:ITrack,index:number)=>{
      if(this.DbAudio){
        this.DbAudio[index].volume = this.volume
      }
        if(el.id==this.Track?.id){
          this.indice = index
        }
      })
      this.player?.play()
    })
  }


  startVolum() {
    this.volume = this.Form.get("range")?.value / 100
    this.DbAudio?.forEach(el => 
      {
        el.volume = this.volume
      })
  }

  played(bool: boolean) {
    this.play = bool;
    if (bool) {
      this.player?.play()
      this.btn = "../../../assets/Images/pause.png";
    }
    else {
      this.player?.pause()
      this.btn = "../../../assets/Images/play.png";
    }
  }

  prev() {
    if (this.DbAudio) {
      this.restart()
      this.indice = Number(this.indice);
      this.indice -= 1;
      this.validate(this.indice)
      this.player = this.DbAudio[this.indice]
      this.Track = this.Tracks[this.indice];
    }
    this.player?.play()
  }

  next() {
    if(this.DbAudio){
      this.restart()
      this.indice = Number(this.indice);
      this.indice += 1;
      this.validate(this.indice)
      this.player = this.DbAudio[this.indice]
      this.Track = this.Tracks[this.indice]
    }
    this.player?.play()
  }

  restart(){
    this.DbAudio?.forEach(el=> {
      el.pause()
      el.currentTime = 0
    })
  }

  validate(value: number) {
    this.indice = value
    if (this.indice < 0) {
      this.indice = this.Tracks.length - 1;
    }
    if (this.indice == this.Tracks.length) {
      this.indice = 0
    }
  }

  
}
