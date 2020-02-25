import { createSelector } from "reselect";
import { GifSelectorState } from "./redux";

const getGifs = (state: GifSelectorState) => state.gifs;

export const toGetGifById = (id: string) =>
  createSelector(getGifs, gifs => gifs[id]);
