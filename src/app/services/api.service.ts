import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ITrack } from '../Interfaces/Track';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  Client: HttpClient;
  Tracks: ITrack[] = []
  constructor(private client: HttpClient) {
    this.Client = client;
  }

  getAutoload(term: string): any {
    return new Promise((resolve, fail) => {
      try {
        const url: string = "https://shazam-core.p.rapidapi.com/v1/search/multi?query=" + term + "&search_type=SONGS_ARTISTS";
        const HEADERS = new HttpHeaders({
          'X-RapidAPI-Key': '5ad54abd75msh693244e8a652de3p189267jsn79055e1dcc5c',
          'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
        });
        this.Client.get(url, { headers: HEADERS }).subscribe(data => resolve(data))
      } catch (error) {
        fail(error)
      }
    })
  }

  async Autoload() {
    const data = await this.getAutoload("pop")
    data.tracks.hits.map((el: any, i: number) => {
      const obj = { title: "", url: "", imgTab: "", banda: "", id: 0 }
      obj.title = el.track.title
      obj.url = el.track.hub.actions[1].uri
      obj.imgTab = el.track.images.coverarthq
      obj.banda = el.track.images.background
      obj.id = el.track.key
      this.Tracks.push(obj)
    })
    return this.Tracks
  }

  Search(string:string){
    const url: string = "https://shazam-core.p.rapidapi.com/v1/search/multi?query=" + string + "&search_type=SONGS_ARTISTS";
      const HEADERS = new HttpHeaders({
        'X-RapidAPI-Key': '5ad54abd75msh693244e8a652de3p189267jsn79055e1dcc5c',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
      });
    try {
      return this.Client.get(url,{headers:HEADERS})
    } catch (error) {
      console.error("ERRRO: "+error)
      return this.Client.get(url,{headers:HEADERS})
    }
  }
}
