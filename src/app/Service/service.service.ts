import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../Modelo/persona';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {
  }

  url = 'http://localhost:9090/api/person';
  /**
   * Listas todas las personas de la base de datos
   * @returns {List} retorna una lista de personas
   */
  getPersonas() {
    return this.http.get<Persona[]>(this.url);
  }
  /**
   * Registrar Persona
   * @param persona Guarda los datos de una persona
   * @returns 
   */
  createPersona(persona: Persona) {
    return this.http.post<Persona>(this.url, persona)
  }
  /**
   * Listar persona por id
   * @param id del objeto persona
   * @returns 
   */
  getPersonaId(id: number) {
    return this.http.get<Persona>(this.url + "/" + id);
  }
  /**
   * Actualiza los datos de la persona
   * @param persona 
   * @returns 
   */
  updatePersona(persona: Persona) {
    return this.http.put<Persona>(this.url + "/" + persona.id, persona);
  }
  /**
   * Elimina un registro de la base de datos
   * @param persona 
   * @returns 
   */
  deletePersona(persona: Persona) {
    return this.http.delete<Persona>(this.url + "/" + persona.id);
  }
}
