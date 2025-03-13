import { Injectable, signal } from '@angular/core';
import { Superhero } from '../models/superhero.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  private apiUrl= 'http://localhost:3000/superhero'
  private superheroSignal = signal<Superhero[]>([]);
  constructor(private http: HttpClient) { }

  getAllSuperhero(): Observable<Superhero[]> {
   return this.http.get<Superhero[]>(this.apiUrl).pipe(
    tap(superheros => this.superheroSignal.set(superheros)
   )
    )
  }

  get superheros() {
    return this.superheroSignal
  }

  addSuperhero(Superhero: Superhero){ 
    this.http.post(this.apiUrl,Superhero).subscribe(
      ()=> this.getAllSuperhero()
    )
  }
  
  updateSuperhero(id: string, updateSuperhero:Superhero){
    this.http.put(`${this.apiUrl}/${id}`, updateSuperhero)
    .subscribe(() => this.getAllSuperhero());
  }

  getSuperheroById(id:number) {
    return this.superheroSignal().find(superhero => superhero.id === id);
  }

  deleteSuperhero(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      ()=> this.getAllSuperhero()
    );
  }



}
