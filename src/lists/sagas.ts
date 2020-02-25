import { call, put, select, takeLatest, take } from "redux-saga/effects";
import { updateGifs } from "../gifs";
import { fetchTrendingGifs } from "./api";
import { PaginatedGifs, GIF_LOAD_LIMIT } from "./models";
import {
  loadGifsSuccess,
  GifListActionTypes,
  loadMoreGifsSuccess,
  loadGifs
} from "./redux";
import { getCurrentGifsOffset } from "./selectors";

const loadTrendingGifsSaga = function*(isInitialLoad: boolean, offset: number) {
  const paginatedGifs: PaginatedGifs = yield call(fetchTrendingGifs, offset);
  if (isInitialLoad) {
    yield put(loadGifsSuccess(paginatedGifs.gifs));
  } else {
    yield put(loadMoreGifsSuccess(paginatedGifs));
  }
  yield put(updateGifs(paginatedGifs.gifs));
};

export const paginationManagerSaga = function*() {
  try {
    yield call(loadGifsSaga, fetchGifs, true, 0);

    while (true) {
      yield take(GifListActionTypes.LoadMore);
      const currentOffset: number = yield select(getCurrentGifsOffset);
      yield call(
        loadGifsSaga,
        false,
        currentOffset + GIF_LOAD_LIMIT
      );
    }
  } catch (e) {
    // do nothing for now
  }
};

export const gifListWatcherSaga = function*() {
  yield takeLatest(
    GifListActionTypes.Load,
    paginationManagerSaga
  );
};
