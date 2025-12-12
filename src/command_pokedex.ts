import type { State } from "./state";

export async function commandPokedex(state: State) {

    for ( const pokemon in state.pokedex) {
        console.log(`- ${pokemon}`);
    }
}
