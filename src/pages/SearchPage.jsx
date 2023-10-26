import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CardPokemon } from '../components';
import { PokemonContext } from '../context/PokemonContext';

export const SearchPage = () => {
	const location = useLocation();
  console.log(location);

	const { globalPokemon } = useContext(PokemonContext);

	const filteredPokemon = globalPokemon.filter(pokemon =>
		pokemon.name.includes(location.state.toLowerCase())
	);

  console.log(filteredPokemon);
  
	return (
		<div className='container'>
			<p className='p-search'>
				Se encontraron <span>{filteredPokemon.length}</span>{' '}
				resultados:
			</p>
			<div className='card-list-pokemon container'>
				{filteredPokemon.map(pokemon => (
					<CardPokemon pokemon={pokemon} key={pokemon.id} />
				))}
			</div>
		</div>
	);
};