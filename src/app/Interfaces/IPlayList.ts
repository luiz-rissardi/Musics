export interface IPlayList
{
        playlistName: string;
        PlayListImg: string;
        id:number;
        musics: [
          {
            id:number,
            title: string,
            url: string,
            imgTab: string,
            banda: string
          }
        ]
}