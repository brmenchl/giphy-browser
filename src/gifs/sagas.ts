import { call, put, takeLeading } from "redux-saga/effects";
import { fetchTrendingGifs } from "./api";
import { Gif } from "./models";
import { loadTrendingGifsSuccess, GifActionTypes } from "./redux";

export const loadTrendingGifsSaga = function*() {
  try {
    const trendingGifs: Gif[] = yield call(fetchTrendingGifs);
    yield put(loadTrendingGifsSuccess(trendingGifs));
  } catch (e) {
    // do nothing for now
  }
};

export const gifsWatcherSaga = function*() {
  yield takeLeading(GifActionTypes.Load, loadTrendingGifsSaga);
};
