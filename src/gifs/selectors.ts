import { prop, map, propEq, find } from "ramda";
import { createSelector } from "reselect";
import { Gif } from "./models";
import { GifSelectorState } from "./redux";

const getGifsState = (state: GifSelectorState) => state.gifs;

const getGifs = createSelector(getGifsState, gifsState => gifsState.gifs);

export const getIsLoadingGifs = createSelector(
  getGifsState,
  gifsState => gifsState.isLoading
);

export const getAllGifIds = createSelector(getGifs, map(prop("id")));

export const toGetGifById = (id: string) =>
  createSelector(getGifs, find<Gif>(propEq("id", id)));
