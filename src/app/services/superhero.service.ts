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
      tap(superheroes => this.superheroSignal.set(superheroes))
    );
  }

  get superheros() {
    return this.superheroSignal;
  }

  addSuperhero(superhero: Superhero): Observable<Superhero> {
    return this.http.post<Superhero>(this.apiUrl, superhero).pipe(
      tap((newSuperhero) => {
        this.superheroSignal.update((superheroes) => [...superheroes, newSuperhero]);
      })
    );
  }
  
  updateSuperhero(id: string, updateSuperhero: Superhero): Observable<Superhero> {
    return this.http.put<Superhero>(`${this.apiUrl}/${id}`, updateSuperhero).pipe(
      tap((updatedSuperhero) => {
        this.superheroSignal.update((superheroes) =>
          superheroes.map((hero) => (hero.id === updatedSuperhero.id ? updatedSuperhero : hero))
        );
      })
    );
  }

  getSuperheroById(id: number) {
    return this.superheroSignal().find(superhero => superhero.id === id);
  }

  deleteSuperhero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getAllSuperhero().subscribe())
    );
  }
}