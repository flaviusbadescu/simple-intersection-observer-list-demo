import { useCallback, useEffect } from "react";
import {
  fetchCharacters,
  useCanFetchMore,
  useCharacters,
} from "../store/charactersSlice";
import { useAppDispatch } from "../store/store";

export const useCharactersHook = () => {
  const hasMore = useCanFetchMore();
  const dispatch = useAppDispatch();
  const characters = useCharacters();

  const fetchMore = useCallback(
    (page: number) => {
      dispatch(fetchCharacters({ page }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return { hasMore, fetchMore, characters };
};
