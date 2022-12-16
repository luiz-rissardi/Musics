export interface IUser {
  nameUser: string,
  id: number,
  password: string,
  ImgUser: string,
  playlists: [{
    playlistName: string,
    PlayListImg: string,
    id:number,
    musics: [
      {
        id:number,
        title: string,
        url: string,
        imgTab: string,
        banda: string
      }
    ]
  }],
  
  Curte: [
    {
      id:number,
      title: string,
      url: string,
      imgTab: string,
      banda: string
    }
  ]
  // [object,object]
}
