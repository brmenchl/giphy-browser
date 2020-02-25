import { createSelector } from "reselect";
import { GifListSelectorState } from "./redux";

const getGifList = (state: GifListSelectorState) => state.gifList;

const getGifPagination = createSelector(
  getGifList,
  gifList => gifList.pagination
);

export const getIsLoadingGifs = createSelector(
  getGifList,
  gifList => gifList.isLoading
);

export const getAllGifIds = createSelector(getGifList, gifList => gifList.ids);

export const getIsLoadingMoreGifs = createSelector(
  getGifPagination,
  pagination => pagination.isLoading
);

export const getCurrentTrendingGifsOffset = createSelector(
  getGifPagination,
  pagination => pagination.offset
);
