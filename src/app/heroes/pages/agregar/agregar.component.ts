import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute,Router } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    border-radius:6px;
    width:80%;
  }`
  ]
})

export class AgregarComponent implements OnInit {

  heroe:Heroe={
    publisher: Publisher.DCComics,
    alter_ego:"",
    alt_image:"",
    superhero:"",
    characters:"",
    first_appearance:""
  };

  publishers=[
    {
      id:"DC Comics",
      desc:"DC - Comics"
    },
    {
      id:"Marvel Comics",
      desc:"Marvel - Comics"
    },
  ];

  constructor(
    private HeroesService:HeroesService,
    private ActivatedRoute:ActivatedRoute, 
    private Router:Router,
    private snackBar:MatSnackBar,
    public dialog: MatDialog) { };

  ngOnInit(): void {
    
    if(!this.Router.url.includes("editar")){
      return;
    };
    this.ActivatedRoute.params.pipe(switchMap(({id})=>this.HeroesService.getHeroePorId(id)))
    .subscribe((heroe)=>this.heroe=heroe);
  };

  guardar(){

   if (this.heroe.superhero.trim().length===0) {
     return;
   };

   if(this.heroe.id){
     this.HeroesService.actualizarHeroe(this.heroe).subscribe(heroe=>this.mostrarSnackBar("registro actualizado"));
   }

   else{
    this.HeroesService.agregarHeroe(this.heroe).subscribe(heroe=>{
    this.Router.navigate(['/heroes/editar',heroe.id]);
    this.mostrarSnackBar("registro creado")
  });
}
  };

  borrarHeroe(){

    const dialog=this.dialog.open(ConfirmarComponent,{
      width:"250px",
      data:this.heroe
    });
    
    dialog.afterClosed().subscribe((resp=>{
      if (resp) {
        this.HeroesService.borrarHeroe(this.heroe.id!).subscribe(resp=>{
          this.Router.navigate(['/heroes']);
      })
    }
  })
    )};
    
  mostrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje,"cerrar",{
      duration:2500
    })
  };
};
