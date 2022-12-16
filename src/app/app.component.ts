import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProjetoSass';

  Route:Router
  constructor(private route:Router){
    this.Route = route;
    this.Route.navigate(["/login"])

  }

}
