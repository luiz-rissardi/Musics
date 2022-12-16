import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { AddPlayListComponent } from './components/add-play-list/add-play-list.component';
import { MasterComponent } from './components/master/master.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { RedefinirsenhaComponent } from './components/redefinirsenha/redefinirsenha.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddMusicComponent } from './components/add-music/add-music.component';
import { CurtidasComponent } from './components/curtidas/curtidas.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"singUp",component:SingUpComponent},
  {path:"redefinir",component:RedefinirsenhaComponent},
  {
    path:"",component:MasterComponent,
    children:[
    {path:"home",component:HomeComponent},
    {path:"PlayList",component:PlaylistComponent},
    {path:"AddList",component:AddPlayListComponent},
    {path:"edit",component:EditUserComponent},
    {path:"addMusic",component:AddMusicComponent},
    {path:"curtidas",component:CurtidasComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
