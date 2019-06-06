import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from "../heroes.service";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-heroes-add',
  templateUrl: './heroes-add.component.html',
  styleUrls: ['./heroes-add.component.scss']
})
export class HeroesAddComponent implements OnInit {

  heroForm: FormGroup;
  hero_name:string='';
  hero_universe:string='';
  hero_powers:Array<string>=[];
  isLoadingResults = false;

  powerList:Array<any>;
  universeList:Array<any>;

  constructor(
    private router: Router, 
    private heroesService: HeroesService, 
    private formBuilder: FormBuilder
  ) { }

  getPowerList(){
    this.heroesService.getPowers().subscribe(data => {
      this.powerList = data;
    }); 
  }

  getUniverseList(){
    this.heroesService.getUniverses().subscribe(data => {
      this.universeList = data;
    }); 
  }

  ngOnInit() {
    this.getPowerList();
    this.getUniverseList();

    this.heroForm = this.formBuilder.group({
      'hero_name' : [null, Validators.required],
      'hero_universe' : [null, Validators.required],
      'hero_powers' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.heroesService.addHero(form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/heroi-detalhes', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
