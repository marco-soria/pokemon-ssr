import { Component, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { PokemonCard } from '../pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
})
export class PokemonList {
  public pokemons = input.required<SimplePokemon[]>();
}
