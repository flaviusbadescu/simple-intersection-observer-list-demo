import axios from "axios";
import { Character, CharacterFilter, Info } from "../types/Character";

const BASE_URL = "https://rickandmortyapi.com/api";

const getCharacters = async (
  filters?: CharacterFilter
): Promise<Info<Character[]>> => {
  const { data } = await axios.get<Info<Character[]>>(`${BASE_URL}/character`, {
    params: filters,
  });
  return data;
};

export { getCharacters };
