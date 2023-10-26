import React, { useContext } from 'react';
import PokemonList from '../components/PokemonList'
import { PokemonContext } from '../context/PokemonContext';

export const HomePage = () => {

  const {onClickLoadMore} = useContext(PokemonContext)
  return (
    <>
      <div className="container">
        <PokemonList />
        <div className="container-btn-load-more container">
                <button className='btn-load-more' onClick={onClickLoadMore}>
                    Cargar más
                </button>
            </div>
      </div>
    </>
  )
}
