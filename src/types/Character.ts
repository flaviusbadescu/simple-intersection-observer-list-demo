export type Character = {
  id: number;
  name: string;
  url: string;
  created: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
};

export type CharacterLocation = {
  name: string;
  url: string;
};

export enum Gender {
  FEMALE = "Female",
  MALE = "Male",
  GENDERLESS = "Genderless",
  UNKNOWN = "unknown",
}

export enum Status {
  ALIVE = "Alive",
  DEAD = "Dead",
  UNKNOWN = "unknown",
}

export type CharacterFilter = {
  name?: string;
  type?: string;
  species?: string;
  status?: Status;
  gender?: Gender;
  page?: number;
};

export type Info<T> = {
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T;
};
