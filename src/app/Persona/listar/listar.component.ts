import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Persona } from 'src/app/Modelo/persona';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  //La variable "personas" viene el ngFor de la tabla personas en el html
  personas: Persona[] = [];
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.service.getPersonas().subscribe(data => {
      this.personas = data;
    })
  }
  Editar(persona: Persona): void {
    localStorage.setItem("id", persona.id.toString());
    this.router.navigate(["edit"]);
  }
  Delete(persona: Persona) {
    Swal.fire({
      title: 'Aguarda...!!!, ¿Estás seguro que deseas eliminar a esa persona?',
      text: "Una vez eliminado no podrás revertirlo!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'El empleado ha sido eliminado.',
          'success'
        )
        this.service.deletePersona(persona)
        .subscribe(data => {
          this.personas = this.personas.filter(p => p !== persona);
        })
      }else if(result.isDismissed){
        Swal.fire('Petición Cancelada', 'No se ha eliminado nada', 'error')
      }
    })
  }
}
