import { Injectable } from '@angular/core';
import { Hero } from './hero';

// import { hero_list } from './hero_list'; // Here we are importing data of heroes into Hero comnponent

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'; // getting messages from message service
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';//for error handling

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private message_service_object: MessageService,private http_object: HttpClient) { }

  private Url = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroList(): Observable<Hero[]> //Currently we have mock data so we can work without observable but with async type of data, in order to maintain sequence we have used of from rxjs.
  { 
    return this.http_object.get<Hero[]>(this.Url)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    ); //it will catch if observable fails pass the error 
    //handleerror solve the error and returns something for flow of application
  }

  //Get hero by ID, If not found will execute 404
  getHero(id: number): Observable<Hero> {
    const url = `${this.Url}/${id}`;
    return this.http_object.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //Return `undefined` when id not found 
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.Url}/?id=${id}`;
    return this.http_object.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }


// HandleErro and Log function
private log(message: string) {
  this.message_service_object.add(`HeroService: ${message}`);
}

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); // log to console instead

    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


//Add, Delete, Update & Search function

// update the hero on the server 
updateHero(hero: Hero): Observable<any> {
  return this.http_object.put(this.Url, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );

}

// Add a hero using add button
addHero(hero: Hero): Observable<Hero> {
  return this.http_object.post<Hero>(this.Url, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

// Delete the hero by their respective delete button
deleteHero(id: number): Observable<Hero> {
  const url = `${this.Url}/${id}`;

  return this.http_object.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

//search hero by initials
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if you search doesn't exists, return empty hero array.
    return of([]);
  }
  return this.http_object.get<Hero[]>(`${this.Url}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`Mtaches found"${term}"`) : // if it has a length then show found matches
       this.log(`No match found"${term}"`)), //If condition is false it rexecutes this part,
    catchError(this.handleError<Hero[]>('Search', []))
  );
}
}