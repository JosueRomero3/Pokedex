import { useEffect, useState } from 'react';
import { useForm } from '../hook/useForm';
import { PokemonContext } from './PokemonContext';

export const PokemonProvider = ({ children }) => {
    const [ allPokemon, setAllPokemon ] = useState([])
    const [ globalPokemon, setGlobalPokemon ] = useState([])
    const [ offset, setOffset ] = useState(0);

    //Estados
    const [loading, setLoading] = useState(true)

    //Para el formulario
    const { onInputChange, valueSearch, onResetForm } = useForm({
		valueSearch: '',
	});

    //Primeros 50 pokemon

    const getAllPokemon = async (limit = 50) => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=${limit}&offset=${offset}`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setAllPokemon([...allPokemon, ...results]);
		setLoading(false);
	};
    // Todos los Pokemon

    const getGlobalPokemon = async () => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=100000&offset=0`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setGlobalPokemon(results);
		setLoading(false);
	};

    //Pokemon por ID

    const getPokemonByID = async id => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};

	// boton cargar mas
	const onClickLoadMore = () => {
		setOffset(offset + 50);
	};

	useEffect(() => {
		getAllPokemon();
	}, [offset]);

    useEffect(()=>{
        getGlobalPokemon();
    }, ([]))

    return (
        <PokemonContext.Provider value={{
            valueSearch,
			onInputChange,
			onResetForm,
            allPokemon,
			globalPokemon,
            getPokemonByID, 
			onClickLoadMore,
			loading
        }}>
            {children}
        </PokemonContext.Provider>
    );
};