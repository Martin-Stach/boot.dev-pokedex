import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  limit = 20;
  cache = new Cache(1000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url =
      pageURL ?? `${PokeAPI.baseURL}/location-area/?limit=${this.limit}`;

    let data: ShallowLocations;
    if (this.cache.get(url)) {
      data = this.cache.get(url) as ShallowLocations;
    } else {
      const result = await fetch(url);
      data = await result.json();
      this.cache.add(url, data);
    }

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
};
