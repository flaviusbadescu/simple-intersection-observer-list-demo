import List from "../components/List";
import { useCharactersHook } from "./useCharactersHook";

export const CharactersList = () => {
  const { characters, hasMore, fetchMore } = useCharactersHook();

  return (
    <div>
      <List
        className="py-10 px-10 m-auto overflow-y-auto h-[550px] mt-40"
        hasMore={hasMore}
        style={{
          display: "flex",
          flexFlow: "row wrap",
          position: "relative",
        }}
        list={characters}
        height={550}
        onFetchMore={fetchMore}
        renderItem={(character) => (
          <div className="flex m-2">
            <img src={character.image} />
          </div>
        )}
      />
    </div>
  );
};
