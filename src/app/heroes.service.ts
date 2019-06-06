import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Hero } from './domain/hero';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:8081/";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(
    private http: HttpClient
  ) { }

  getPowers(): Observable<Hero[]> {
    return this.http.get<Hero[]>(apiUrl+"powers")
      .pipe(
        tap(heroes => console.log('fetched powers')),
        catchError(this.handleError('getPowers', []))
      );
  }

  getUniverses(): Observable<Hero[]> {
    return this.http.get<Hero[]>(apiUrl+"universes")
      .pipe(
        tap(heroes => console.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(apiUrl+"heroes")
      .pipe(
        tap(heroes => console.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }
  
  getHero(id: number): Observable<Hero> {
    const url = `${apiUrl+"heroes"}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  
  addHero (form): Observable<Hero> {
    let hero = this.convertFormToHero(form);

    return this.http.post<Hero>(apiUrl+"heroes", hero, httpOptions).pipe(
      tap((path: any) => console.log(`added hero w/ id=${path.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  
  updateHero (id, form): Observable<any> {
    const url = `${apiUrl+"heroes"}/${id}`;

    let hero = this.convertFormToHero(form);

    return this.http.put(url, hero, httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  
  deleteHero (id): Observable<Hero> {
    const url = `${apiUrl+"heroes"}/${id}`;
  
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error);
  
      return of(result as T);
    };
  }

  private convertFormToHero(form) {
    let hero = new Hero();

    hero.name = form.hero_name;
    hero.universe = {id: form.hero_universe};
    hero.powers = this.getPowerObj(form.hero_powers)

    return hero;
  }

  private getPowerObj(ids){
    let powers = [];
    ids.map((id) => {
      powers.push({id: id});
    });
    return powers;
  }

  /*getMockedHeroesUniverses(){
    var universes = [
      {id: 1, universe_name: 'EY Comics'},
      {id: 2, universe_name: 'Trainee Comics'},
      {id: 3,universe_name: 'Outros'}
    ]

    return of(universes);
  }*/

  /*getMockedHeroesPowers(){
    var powers = [
      {id: 1, power_name: 'bola de fogo'},
      {id: 2, power_name: 'explosão de fogo'},
      {id: 3, power_name: 'Soco atômico'},
      {id: 4, power_name: 'Super pulo'},
      {id: 5, power_name: 'Mega velocidade'},
      {id: 6, power_name: 'Invisibilidade'},
      {id: 7, power_name: 'Camuflagem'},
      {id: 8, power_name: 'Chamado animal'},
      {id: 9, power_name: 'Força sobrehumana'}
    ]

    return of(powers);
  }*/

  /*getMockedHeroes (){

    var heroesMock:Array<Hero> = [
      {
        id: '123',
        name: 'Magmus',
        powers: [{id: '1', power_name: 'bola de fogo'}, {id: '2', power_name: 'explosão de fogo'}], 
        universe: {id: '1', universe_name: 'EY Comics'},
        created_at: null
      },
      {
        id: '456',
        name: 'Khalits',
        powers: [{id: '4', power_name: 'Super pulo'}, {id: '5', power_name: 'Mega velocidade'}], 
        universe: {id: '2', universe_name: 'Trainee Comics'},
        created_at: null
      }
    ]

    return of(heroesMock);
  }

  getMockedHero(id){

    var heroesMock:Array<Hero> = [
      {
        id: '123',
        name: 'Magmus',
        powers: [{id: '1', power_name: 'bola de fogo'}, {id: '2', power_name: 'explosão de fogo'}], 
        universe: {id: '1', universe_name: 'EY Comics'},
        created_at: null
      },
      {
        id: '456',
        name: 'Khalits',
        powers: [{id: '4', power_name: 'Super pulo'}, {id: '5', power_name: 'Mega velocidade'}], 
        universe: {id: '2', universe_name: 'Trainee Comics'},
        created_at: null
      }
    ]

    for(let hero of heroesMock)
    {
      if(hero.id == id)
      {
        return of(hero);
      } 
    }
  }*/
}
