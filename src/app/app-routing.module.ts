import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroesDetailComponent } from './heroes-detail/heroes-detail.component';
import { HeroesAddComponent } from './heroes-add/heroes-add.component';
import { HeroesEditComponent } from './heroes-edit/heroes-edit.component';

const routes: Routes = [
  {
    path: 'herois',
    component: HeroesComponent,
    data: { title: 'Heróis' }
  },
  {
    path: 'heroi-detalhes/:id',
    component: HeroesDetailComponent,
    data: { title: 'Herói' }
  },
  {
    path: 'novo-heroi',
    component: HeroesAddComponent,
    data: { title: 'Add Herói' }
  },
  {
    path: 'editar-heroi/:id',
    component: HeroesEditComponent,
    data: { title: 'Edit Herói' }
  },
  { path: '',
    redirectTo: '/herois',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
