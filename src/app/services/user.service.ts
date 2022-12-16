import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../Interfaces/IUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  User: HttpClient;
  Usuario?: IUser;
  url: string = "http://localhost:3000/Login";

  constructor(private user: HttpClient, private routers: Router) {
    this.User = user;
  }

  Login(nameuser: string, password: string): any {
    return new Promise((resolve, fail) => {
      try {
        this.User.get(this.url).subscribe((data: any) => {
          const login = data.filter((user: any) => {
            return this.filter(user, nameuser)
          })[0]
          if (login != undefined) {
            if (login.password == password) {
              resolve(login);
            }
            else {
              resolve(2)
            }
          }
          else {
            resolve(1);
          }
        })
      } catch (error) {
        fail(error)
      }
    })
  }

  filter(el: IUser, user: string) {
    return el.nameUser == user
  }

  getId(id: number): Promise<IUser> {
    return new Promise((resolve, fail) => {
      try {
        this.User.get(this.url).subscribe((data: any) => {
          const user = data.map((el: any) => el).filter((el: any) => el.id == id)
          resolve(user[0]);
        })
      } catch (error) {
        fail(error)
      }
    })
  }

  SignIn(User: IUser) {
    return new Promise((resolve, reject) => {
      let validation = 0;
      let id = 0;
      this.user.get(this.url).subscribe((data: any) => {
        for (let item of data) {
          id = Number(item.id);
          if (String(User.nameUser) == String(item.nameUser)) {
            validation = 1
          }
        }
        id += 1;
        User.id = id;
        User.playlists.pop()
        User.Curte.pop();
        if (validation != 1) {
          this.user.post(this.url, User).subscribe(() => this.routers.navigate(["/login"]));
          resolve(true)
        }
        resolve(false)
      })
    })
  }

  Redefinir(nome: string, senha: string,) {
    return new Promise((resolve, fail) => {
      let id;
      let validation = 0;
      try {
        this.User.get(this.url).subscribe((data: any) => {
          for (let item of data) {
            if (nome == item.nameUser) {
              this.Usuario = item;
              id = item.id;
              const urlPut = this.url + `/${id}`
              if (this.Usuario) {
                this.Usuario.password = senha;
                this.User.put(urlPut, this.Usuario).subscribe(data => {
                })
                validation = 1;
                resolve(validation)
              }
            }
          }
          resolve(validation);
        })
      } catch (error) {
        fail(error)
      }
    })
  }

  AtualizarUser(user: IUser) {
    const id = user.id;
    const urlPut = this.url + `/${id}`;
    this.User.put(urlPut, user).subscribe();
  }

  remove(User: IUser, id: number) {
    const index = User.playlists.filter(el => el.id != id)
    for (let i in User.playlists) {
      User.playlists[i] = index[i];
    }
    User.playlists.pop();
    this.AtualizarUser(User)
  }
}
