

export class PokeAPI {
    private static readonly baseURL = 'https://pokeapi.co/api/v2';
    limit = 20;

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area/?limit=${this.limit}`;
        const result = await fetch(url);
        const data = await result.json();
        return data as ShallowLocations;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const res = await fetch(url);
        const data = await res.json();
        return data as Location;
    }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
    name: string;
}
// export type Location = {
//     areas: {
//         name: string;
//         url: string;
//     }[],
//     game_indices: {
//         game_index: number;
//         generation: {
//             name: string;
//             url: string;
//         },
//     }[],
//     id: number;
//     name: string;
//     names: {
//         language: {
//             name: string;
//             url: string;
//         },
//         name: string,
//     }[],
//     region: {
//         name: string;
//         url: string;
//     }
// }