import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit 
{
  list_of_hero: Hero[] = [];

  constructor(private hero_service_object: HeroService) { }

  ngOnInit(): void {
    this.getHeroData();
  }

  getHeroData(): void {
    this.hero_service_object.getHeroList()
      .subscribe(hero_list => this.list_of_hero = hero_list.slice(1, 5));
  }
}


