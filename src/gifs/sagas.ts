import { call, put, select, takeLatest, take } from "redux-saga/effects";
import { fetchTrendingGifs } from "./api";
import { PaginatedGifs, GIF_LOAD_LIMIT } from "./models";
import {
  loadTrendingGifsSuccess,
  GifActionTypes,
  loadMoreTrendingGifsSuccess
} from "./redux";
import { getCurrentTrendingGifsOffset } from "./selectors";

export const loadTrendingGifsSaga = function*() {
  try {
    const paginatedGifs: PaginatedGifs = yield call(fetchTrendingGifs, 0);
    yield put(loadTrendingGifsSuccess(paginatedGifs.gifs));

    while (true) {
      yield take(GifActionTypes.LoadMore);
      const currentOffset: number = yield select(getCurrentTrendingGifsOffset);
      const paginatedGifs: PaginatedGifs = yield call(
        fetchTrendingGifs,
        currentOffset + GIF_LOAD_LIMIT
      );
      yield put(loadMoreTrendingGifsSuccess(paginatedGifs));
    }
  } catch (e) {
    // do nothing for now
  }
};

export const gifsWatcherSaga = function*() {
  yield takeLatest(GifActionTypes.Load, loadTrendingGifsSaga);
};
