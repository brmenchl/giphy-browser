import { Reducer } from "redux";
import { Gif, PaginatedGifs } from "./models";

export enum GifActionTypes {
  Load = "gifs/load",
  LoadMore = "gifs/loadMore",
  LoadSuccess = "gifs/loadSuccess",
  LoadMoreSuccess = "gifs/loadMoreSuccess"
}

export const loadTrendingGifs = () => ({
  type: GifActionTypes.Load as const
});

export const loadMoreTrendingGifs = () => ({
  type: GifActionTypes.LoadMore as const
});

export const loadTrendingGifsSuccess = (gifs: Gif[]) => ({
  type: GifActionTypes.LoadSuccess as const,
  payload: gifs
});

export const loadMoreTrendingGifsSuccess = (paginatedGifs: PaginatedGifs) => ({
  type: GifActionTypes.LoadMoreSuccess as const,
  payload: paginatedGifs
});

type GifAction = ReturnType<
  | typeof loadTrendingGifs
  | typeof loadMoreTrendingGifs
  | typeof loadTrendingGifsSuccess
  | typeof loadMoreTrendingGifsSuccess
>;

type Pagination = {
  isLoading: boolean;
  offset: number;
};

export type GifsState = {
  isLoading: boolean;
  gifs: Gif[];
  pagination: Pagination;
};

export type GifSelectorState = {
  gifs: GifsState;
};

const initialState: GifsState = {
  isLoading: false,
  gifs: [],
  pagination: {
    isLoading: false,
    offset: -1
  }
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
    case GifActionTypes.LoadMore:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          isLoading: true
        }
      };
    case GifActionTypes.LoadSuccess:
      return {
        ...state,
        isLoading: false,
        gifs: action.payload,
        pagination: {
          isLoading: false,
          offset: 0
        }
      };
    case GifActionTypes.LoadMoreSuccess:
      return {
        ...state,
        isLoading: false,
        gifs: [...state.gifs, ...action.payload.gifs],
        pagination: {
          isLoading: false,
          offset: action.payload.offset
        }
      };
    default:
      return state;
  }
};
