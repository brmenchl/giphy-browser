import { Gif } from "../gifs";

export const GIF_LOAD_LIMIT = 25;

export enum Rating {
  G = "G",
  PG = "PG",
  PG13 = "PG-13",
  R = "R"
}

export type PaginatedGifs = {
  offset: number;
  gifs: Gif[];
};

enum ListName {
  Trending = "Trending",
  Query = "Search"
}

export const toTrendingListType = () => ({
  name: ListName.Trending as const
});

export const toQueryListType = (query: string) => ({
  name: ListName.Query as const,
  query
});

export type ListType = ReturnType<
  typeof toTrendingListType | typeof toQueryListType
>;

export const toListTitle = (listType: ListType) =>
  listType.name === ListName.Trending
    ? "Trending GIFs"
    : `GIFs matching ${listType.query}`;
