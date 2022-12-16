import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';


//http
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';

import { PlaylistComponent } from './components/playlist/playlist.component';
import { AddPlayListComponent } from './components/add-play-list/add-play-list.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { SuportComponent } from './components/suport/suport.component';
import { MasterComponent} from './components/master/master.component';
import { UserService } from './services/user.service';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { RedefinirsenhaComponent } from './components/redefinirsenha/redefinirsenha.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EmiterService } from './services/emiter.service';
import { AddMusicComponent } from './components/add-music/add-music.component';
import { CurtidasComponent } from './components/curtidas/curtidas.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PlaylistComponent,
    AddPlayListComponent,
    PerfilUsuarioComponent,
    SuportComponent,
    MasterComponent,
    SingUpComponent,
    RedefinirsenhaComponent,
    EditUserComponent,
    AddMusicComponent,
    CurtidasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApiService,UserService,EmiterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
