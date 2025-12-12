import type { State } from "./state";

export async function commandCatch(state: State, ...args: string[]) {
	if (args.length !== 1) {
		throw new Error("you must provide a pokemon name");
	}

	const pokemon = args[0];
	const data = await state.pokeAPI.fetchPokemonInfos(pokemon);

	console.log(`Throwing a Pokeball at ${pokemon}...`);

	const chance = data.base_experience; // the higher the exp the harder the catch should be
	const coin = Math.floor(Math.random() * chance);

	if (coin > 40) {
    } else {
        console.log(`${pokemon} escaped!`);
		return;
	}
    
    console.log(`${data.name} was caught!`);
	console.log("You may now inspect it with the inspect command.");
    state.pokedex[data.name] = data;
}
