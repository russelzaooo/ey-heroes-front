import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroesService } from '../heroes.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Power } from '../domain/power';
import { Universe } from '../domain/universe';
import { isDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-heroes-edit',
  templateUrl: './heroes-edit.component.html',
  styleUrls: ['./heroes-edit.component.scss']
})
export class HeroesEditComponent implements OnInit {

  _id:number=null;
  heroForm: FormGroup;
  hero_name:string='';
  hero_universe:number=null;
  hero_powers:Array<any>=[];
  created_at:Date=null;
  isLoadingResults = false;

  powerList:Array<any>;
  universeList:Array<any>;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private heroesService: HeroesService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPowerList();
    this.getUniverseList();

    this.heroForm = this.formBuilder.group({
      'hero_name' : [null, Validators.required],
      'hero_universe' : [null, Validators.required],
      'hero_powers' : [null, Validators.required]
    });
    
    this.getHero(this.route.snapshot.params['id']);
  } 

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

  getHero(id) {
    this.heroesService.getHero(id).subscribe(data => {
      this._id = data.id;
      this.heroForm.setValue({
        hero_name: data.name,
        hero_universe: data.universe.id+'',
        hero_powers: this.getPowerIds(data.powers)
      });
    });
  }

  private getPowerIds(powers){
    let ids = [];
    powers.map((p) => {
      ids.push(p.id+'');
    });
    return ids;
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.heroesService.updateHero(this._id, form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/heroi-detalhes', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  heroDetails() {
    this.router.navigate(['/heroi-detalhes', this._id]);
  }
}
