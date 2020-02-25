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
