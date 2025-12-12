import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  limit = 20;
  private cache: Cache;

  constructor(chacheInterval: number) {
    this.cache = new Cache(chacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url =
      pageURL || `${PokeAPI.baseURL}/location-area/?limit=${this.limit}`;

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

    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached;
    }

    try {
      const res = await fetch(url);
      if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      this.cache.add(url, data);
      return data
      
    } catch (error) {
      throw new Error(`Error fetching location '${locationName}': ${error as Error}.message`); 
    }
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
