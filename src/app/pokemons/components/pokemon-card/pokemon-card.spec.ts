import { Location } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { PokemonCard } from './pokemon-card';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonCard', () => {
  let fixture: ComponentFixture<PokemonCard>;
  let compiled: HTMLElement;
  let component: PokemonCard;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers: [
        provideRouter([{ path: 'pokemons/:name', component: PokemonCard }]),
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCard);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    // console.log(compiled);

    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    const image = compiled.querySelector('img')!;
    expect(image).toBeDefined();

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(image.src).toBe(imageUrl);
    expect(compiled.textContent?.trim()).toBe(mockPokemon.name);
  });

  it('should navigate to the correct pokemon route when clicked', async () => {
    // Obtener el div que tiene el routerLink
    const clickableDiv = compiled.querySelector('div') as HTMLElement;
    expect(clickableDiv).toBeTruthy();

    // Simular el click en el div
    clickableDiv.click();

    // Verificar que la navegación se realizó correctamente
    await fixture.whenStable();
    expect(location.path()).toBe('/pokemons/bulbasaur');
  });
});
