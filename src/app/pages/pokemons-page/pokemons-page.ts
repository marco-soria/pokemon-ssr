import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

import { Title } from '@angular/platform-browser';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { SimplePokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html',
})
export default class PokemonsPage {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);

  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  public loadOnPageChanged = effect(
    () => {
      this.loadPokemons(this.currentPage());
    },
    {
      allowSignalWrites: true,
    }
  );

  public loadPokemons(page = 0) {
    this.pokemonsService
      .loadPage(page)
      .pipe(tap(() => this.title.setTitle(`Pokémons SSR - Page ${page}`)))
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
