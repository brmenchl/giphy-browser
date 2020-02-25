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

export type GifsState = {
  isLoading: boolean;
  gifs: Gif[];
};

export type GifSelectorState = {
  gifs: GifsState;
};

const initialState: GifsState = {
  gifs: [],
  isLoading: false
};

export const gifsReducer: Reducer<GifsState, GifAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GifActionTypes.Load:
      return {
        ...state,
        isLoading: true
      };
    case GifActionTypes.LoadSuccess:
      return {
        gifs: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
