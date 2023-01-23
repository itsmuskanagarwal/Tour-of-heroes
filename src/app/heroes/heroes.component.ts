import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service'; //getting data of all the heroes from service
import { MessageService } from '../message.service'; 



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  list_of_hero : Hero[]=[]; //empty array of hero type to store data coming from service

  // selected_hero?: Hero; //here we will store the clicked hero

  constructor(private hero_service_obj : HeroService, private message_service_object: MessageService){} //injecting both the services

  ngOnInit(): void{
    this.getHeroData()
  }

  getHeroData(): void{
    this.hero_service_obj.getHeroList().subscribe(hero_list => this.list_of_hero = hero_list);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.hero_service_obj.addHero({ name } as Hero)
      .subscribe(hero => {
        this.list_of_hero.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.list_of_hero = this.list_of_hero.filter(h => h !== hero);
    this.hero_service_obj.deleteHero(hero.id).subscribe();
  }
  // OnSelect(hero : Hero): void{
  //   this.selected_hero = hero;  //Getting clicked hero details
  //   this.message_service_object.add(' Hero Selected : ID = ${hero.id}')

  // }

  

}
