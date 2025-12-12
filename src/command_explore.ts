import type { State } from "./state";

export async function commandExplore(state: State, ...args: string[]) {
	if (args.length !== 1) {
		throw new Error("you must provide a location name");
	}

	const [areaName] = args;
	const data = await state.pokeAPI.fetchLocation(areaName);

	console.log(`Exploring ${areaName}`);
	console.log("Found Pokemon:");
	for (const encounter of data.pokemon_encounters) {
		console.log(`- ${encounter.pokemon.name}`);
	}
}
