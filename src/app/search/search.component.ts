import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})

export class SearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>; //return observable of hero type

  private searchTerms = new Subject<string>(); // emit values to more than one subscribers

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term); //add value into observable
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms for new string 
      debounceTime(300), 

      // 
      distinctUntilChanged(), //if the text is same it will not request anything

      // with every serach term that pass above two functions, it calls service
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}