import { Reducer } from "redux";
import { PaginatedGifs } from "./models";
import { Gif } from "../gifs";

export enum GifListActionTypes {
  Load = "gifs/list/load",
  LoadMore = "gifs/list/loadMore",
  LoadSuccess = "gifs/list/loadSuccess",
  LoadMoreSuccess = "gifs/list/loadMoreSuccess"
}

export const loadTrendingGifs = () => ({
  type: GifListActionTypes.Load as const
});

export const loadMoreTrendingGifs = () => ({
  type: GifListActionTypes.LoadMore as const
});

export const loadTrendingGifsSuccess = (gifs: Gif[]) => ({
  type: GifListActionTypes.LoadSuccess as const,
  payload: { gifs }
});

export const loadMoreTrendingGifsSuccess = (paginatedGifs: PaginatedGifs) => ({
  type: GifListActionTypes.LoadMoreSuccess as const,
  payload: paginatedGifs
});

type GifListAction = ReturnType<
  | typeof loadTrendingGifs
  | typeof loadMoreTrendingGifs
  | typeof loadTrendingGifsSuccess
  | typeof loadMoreTrendingGifsSuccess
>;

type Pagination = {
  isLoading: boolean;
  offset: number;
};

export type GifListState = {
  isLoading: boolean;
  ids: string[];
  pagination: Pagination;
};

export type GifListSelectorState = {
  gifList: GifListState;
};

const initialState: GifListState = {
  isLoading: false,
  ids: [],
  pagination: {
    isLoading: false,
    offset: -1
  }
};

export const gifListReducer: Reducer<GifListState, GifListAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GifListActionTypes.Load:
      return {
        ...state,
        isLoading: true
      };
    case GifListActionTypes.LoadMore:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          isLoading: true
        }
      };
    case GifListActionTypes.LoadSuccess:
      return {
        ...state,
        isLoading: false,
        ids: action.payload.gifs.map(gif => gif.id),
        pagination: {
          isLoading: false,
          offset: 0
        }
      };
    case GifListActionTypes.LoadMoreSuccess:
      return {
        ...state,
        isLoading: false,
        ids: [...state.ids, ...action.payload.gifs.map(gif => gif.id)],
        pagination: {
          isLoading: false,
          offset: action.payload.offset
        }
      };
    default:
      return state;
  }
};
