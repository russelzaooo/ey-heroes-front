import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../heroes.service";
import { Hero } from '../domain/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  displayedColumns: string[] = ['hero_name', 'hero_universe'];
  data: Hero[] = [];
  isLoadingResults = true;

  constructor(
    private heroService: HeroesService
  ) { }

  ngOnInit() {
    this.heroService.getHeroes()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
