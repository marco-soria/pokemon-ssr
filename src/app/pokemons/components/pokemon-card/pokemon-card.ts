import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  public pokemon = input.required<SimplePokemon>();

  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        this.pokemon().id
      }.png`
  );

  // logEffect = effect(() => {
  //   console.log('PokemonCard: ', this.pokemon());
  // });
}
