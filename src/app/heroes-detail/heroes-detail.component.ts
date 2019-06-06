import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from "../heroes.service";
import { Hero } from '../domain/hero';


@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.scss']
})
export class HeroesDetailComponent implements OnInit {

  hero: Hero = {
    id: null,
    name: '',
    powers: [],
    universe: null,
    created_at: null
  };

  isLoadingResults = true;
  
  constructor(
    private route: ActivatedRoute, 
    private heroesService: HeroesService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.getHeroDetails(this.route.snapshot.params['id']);
  }

  getHeroDetails(id) {
    this.heroesService.getHero(id)
      .subscribe(data => {
        this.hero = data;
        console.log(this.hero);
        this.isLoadingResults = false;
      });
  }

  deleteHero(id) {
    this.isLoadingResults = true;
    this.heroesService.deleteHero(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/herois']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
