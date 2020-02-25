import { call, put, select, takeLatest, take } from "redux-saga/effects";
import { updateGifs } from "../gifs";
import { fetchTrendingGifs } from "./api";
import { PaginatedGifs, GIF_LOAD_LIMIT } from "./models";
import {
  loadTrendingGifsSuccess,
  GifListActionTypes,
  loadMoreTrendingGifsSuccess
} from "./redux";
import { getCurrentTrendingGifsOffset } from "./selectors";

const loadTrendingGifsSaga = function*(isInitialLoad: boolean, offset: number) {
  const paginatedGifs: PaginatedGifs = yield call(fetchTrendingGifs, offset);
  if (isInitialLoad) {
    yield put(loadTrendingGifsSuccess(paginatedGifs.gifs));
  } else {
    yield put(loadMoreTrendingGifsSuccess(paginatedGifs));
  }
  yield put(updateGifs(paginatedGifs.gifs));
};

export const trendingPaginationManagerSaga = function*() {
  try {
    yield call(loadTrendingGifsSaga, true, 0);

    while (true) {
      yield take(GifListActionTypes.LoadMore);
      const currentOffset: number = yield select(getCurrentTrendingGifsOffset);
      yield call(loadTrendingGifsSaga, false, currentOffset + GIF_LOAD_LIMIT);
    }
  } catch (e) {
    // do nothing for now
  }
};

export const gifListWatcherSaga = function*() {
  yield takeLatest(GifListActionTypes.Load, trendingPaginationManagerSaga);
};
