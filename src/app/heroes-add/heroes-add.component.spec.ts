import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesAddComponent } from './heroes-add.component';

describe('HeroesAddComponent', () => {
  let component: HeroesAddComponent;
  let fixture: ComponentFixture<HeroesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
