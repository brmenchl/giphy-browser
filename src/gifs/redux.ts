import { mergeDeepRight } from "ramda";
import { Reducer } from "redux";
import { GifWithLoadingState, Gif } from "./models";

export enum GifActionTypes {
  Load = "gifs/load",
  LoadSuccess = "gifs/loadSuccess",
  Update = "gifs/update"
}

export const loadGifById = (id: string) => ({
  type: GifActionTypes.Load as const,
  payload: { id }
});

export const loadGifSuccess = (gif: Gif) => ({
  type: GifActionTypes.LoadSuccess as const,
  payload: { gif }
});

export const updateGifs = (gifs: Gif[]) => ({
  type: GifActionTypes.Update as const,
  payload: { gifs }
});

type GifAction = ReturnType<
  typeof loadGifById | typeof loadGifSuccess | typeof updateGifs
>;

export type GifsState = Record<string, GifWithLoadingState>;

export type GifSelectorState = {
  gifs: GifsState;
};

export const gifsReducer: Reducer<GifsState, GifAction> = (
  state = {},
  action
) => {
  switch (action.type) {
    case GifActionTypes.Load:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          isLoading: true
        }
      };
    case GifActionTypes.LoadSuccess:
      return {
        ...state,
        [action.payload.gif.id]: {
          data: action.payload.gif,
          isLoading: false
        }
      };
    case GifActionTypes.Update:
      const newGifs = action.payload.gifs.reduce<GifsState>(
        (acc, gif) => ({
          ...acc,
          [gif.id]: { data: gif, isLoading: false }
        }),
        {}
      );
      return mergeDeepRight(state, newGifs);
    default:
      return state;
  }
};
