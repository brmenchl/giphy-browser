import { prop, map, propEq, find } from "ramda";
import { createSelector } from "reselect";
import { Gif } from "./models";
import { GifSelectorState } from "./redux";

const getGifs = (state: GifSelectorState) => state.gifs;

export const getAllGifIds = createSelector(getGifs, map(prop("id")));

export const toGetGifById = (id: string) =>
  createSelector(getGifs, find<Gif>(propEq("id", id)));
