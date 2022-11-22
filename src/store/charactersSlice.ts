import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getCharacters } from "../api/api";
import { Character, CharacterFilter, Info } from "../types/Character";

import { RootState } from "./store";

export const fetchCharacters = createAsyncThunk<
  Info<Character[]>,
  CharacterFilter | undefined
>("FETCH_CHARACTERS", async (filter?: CharacterFilter) => {
  return await getCharacters(filter);
});

type State = EntityState<Character> & {
  canFetchMore: boolean;
};

const charactersAdapter = createEntityAdapter<Character>({
  selectId: (character) => character.id,
});
const { selectAll, selectById } = charactersAdapter.getSelectors();

const characterSlice = createSlice({
  name: "characters",
  initialState: charactersAdapter.getInitialState({
    canFetchMore: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      charactersAdapter.upsertMany(state, action.payload.results);
      state.canFetchMore = Boolean(action.payload.info?.next);
    });
  },
});

const selectCharactersSlice = createSelector(
  (state: RootState) => state.characters,
  (state: State) => state
);

export const useCanFetchMore = () =>
  useSelector(
    createSelector(selectCharactersSlice, (state: State) => state.canFetchMore)
  );

export const useCharacters = () =>
  useSelector(createSelector(selectCharactersSlice, selectAll));

export const useCharacter = (id: number) =>
  useSelector(
    createSelector(selectCharactersSlice, (state) => selectById(state, id))
  );

export const charactersReducer = characterSlice.reducer;
