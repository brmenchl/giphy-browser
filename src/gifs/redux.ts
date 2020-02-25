import { Reducer } from "redux";
import { Gif } from "./models";

export enum GifActionTypes {
  Load = "gifs/load",
  LoadSuccess = "gifs/loadSuccess"
}

export const loadTrendingGifs = () => ({
  type: GifActionTypes.Load as const
});

export const loadTrendingGifsSuccess = (gifs: Gif[]) => ({
  type: GifActionTypes.LoadSuccess as const,
  payload: gifs
});

type GifAction = ReturnType<
  typeof loadTrendingGifs | typeof loadTrendingGifsSuccess
>;

export type GifSelectorState = {
  gifs: Gif[];
};

const initialState: Gif[] = [];

export const gifsReducer: Reducer<Gif[], GifAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GifActionTypes.LoadSuccess:
      return action.payload;
    default:
      return state;
  }
};
