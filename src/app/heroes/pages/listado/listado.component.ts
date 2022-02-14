import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {

  heroes:Heroe[]=[]

  constructor(private HeroesService:HeroesService) {
   }

  ngOnInit(): void {

    this.HeroesService.getHeroes().subscribe(Heroe=>{
      this.heroes=Heroe;
    });
  }

}
