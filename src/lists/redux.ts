import { Reducer } from "redux";
import {
  PaginatedGifs,
  ListType,
  toTrendingListType,
  toQueryListType
} from "./models";
import { Gif } from "../gifs";

export enum GifListActionTypes {
  LoadTrending = "gifs/list/loadTrending",
  LoadByQuery = "gifs/list/loadByQuery",
  LoadMore = "gifs/list/loadMore",
  LoadSuccess = "gifs/list/loadSuccess",
  LoadMoreSuccess = "gifs/list/loadMoreSuccess"
}

export const loadTrendingGifs = () => ({
  type: GifListActionTypes.LoadTrending as const
});

export const loadGifsByQuery = (query: string) => ({
  type: GifListActionTypes.LoadByQuery as const,
  payload: { query }
});

export const loadMoreGifs = () => ({
  type: GifListActionTypes.LoadMore as const
});

export const loadGifsSuccess = (gifs: Gif[]) => ({
  type: GifListActionTypes.LoadSuccess as const,
  payload: { gifs }
});

export const loadMoreGifsSuccess = (paginatedGifs: PaginatedGifs) => ({
  type: GifListActionTypes.LoadMoreSuccess as const,
  payload: paginatedGifs
});

type GifListAction = ReturnType<
  | typeof loadTrendingGifs
  | typeof loadGifsByQuery
  | typeof loadMoreGifs
  | typeof loadGifsSuccess
  | typeof loadMoreGifsSuccess
>;

type Pagination = {
  isLoading: boolean;
  offset: number;
};

export type GifListState = {
  isLoading: boolean;
  listType: ListType;
  ids: string[];
  pagination: Pagination;
};

export type GifListSelectorState = {
  gifList: GifListState;
};

const initialState: GifListState = {
  isLoading: false,
  listType: toTrendingListType(),
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
    case GifListActionTypes.LoadTrending:
    case GifListActionTypes.LoadByQuery:
      const listType =
        action.type === GifListActionTypes.LoadTrending
          ? toTrendingListType()
          : toQueryListType(action.payload.query);
      return {
        ...state,
        listType: listType,
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
