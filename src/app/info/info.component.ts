import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { hero_list } from '../hero_list';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  current_hero : Hero | undefined ;

  constructor(
    private route_object: ActivatedRoute,
    private hero_service_object: HeroService,
    private location_object: Location
  ) {}

  ngOnInit(): void { //ngOnInit works when object is initialized
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route_object.snapshot.paramMap.get('id'));
    this.hero_service_object.getHero(id).subscribe(hero_list => this.current_hero = hero_list)
  } //made to identify hero id using URL and display correct details 

  goBack(): void {
    this.location_object.back(); //this function will excute when you user clicks Back button
  }

  save(): void {           //edit details and save them and go back to the previous interface
    if (this.current_hero) {
      this.hero_service_object.updateHero(this.current_hero)
        .subscribe(() => this.goBack());
    }
  }

}
