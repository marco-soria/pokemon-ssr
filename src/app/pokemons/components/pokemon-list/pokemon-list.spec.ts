import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { PokemonList } from './pokemon-list';

const mockPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

describe('PokemonListComponent', () => {
  let fixture: ComponentFixture<PokemonList>;
  let compiled: HTMLElement;
  let component: PokemonList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideRouter([]), provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonList);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with 2 pokemon-card', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();

    expect(compiled.querySelectorAll('app-pokemon-card').length).toBe(
      mockPokemons.length
    );
  });

  it('should render "No hay pokémons"', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    expect(compiled.querySelector('div')?.textContent).toContain(
      'No hay pokémons'
    );
  });
});
