import { State } from "./state";

export async function commandMapForward(state: State) {
  console.log("Displaying the map...");
  const data = await state.pokeAPI.fetchLocations(
    state.nextLocationsURL ?? undefined
  );

  const names = data.results.map((loc) => loc.name);
  console.log(names.join("\n"));

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;
}

export async function commandMapBack(state: State) {
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }

  const locations = await state.pokeAPI.fetchLocations(
    state.prevLocationsURL ?? undefined
  );

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const loc of locations.results) {
    console.log(loc.name);
  }
}
