import { Injectable, signal } from '@angular/core';
import { Superhero } from '../models/superhero.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  private apiUrl = 'http://localhost:3000/superhero';
  private superheroSignal = signal<Superhero[]>([]);

  constructor(private http: HttpClient) { }

  getAllSuperhero(): Observable<Superhero[]> {
    return this.http.get<Superhero[]>(this.apiUrl).pipe(
      tap(superheros => this.superheroSignal.set(superheros)) 
    );
  }

  get superheros() {
    return this.superheroSignal;
  }


  addSuperhero(superhero: Superhero) { 
    this.http.post<Superhero>(this.apiUrl, superhero).subscribe(newHero => {
      this.superheroSignal.update(heroes => [...heroes, newHero]);
    });
  }

  updateSuperhero(id: number, updatedSuperhero: Superhero) {
    this.http.put<Superhero>(`${this.apiUrl}/${id}`, updatedSuperhero).subscribe(() => {
      this.superheroSignal.update(heroes => 
        heroes.map(hero => hero.id === id ? updatedSuperhero : hero)
      );
    });
  }

  getSuperheroById(id: number): Superhero | undefined {
    return this.superheroSignal().find(superhero => superhero.id === id);
  }

  deleteSuperhero(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.superheroSignal.update(heroes => heroes.filter(hero => hero.id !== id));
    });
  }
}
