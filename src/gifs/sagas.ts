import { call, put, takeLatest } from "redux-saga/effects";
import { fetchGifById } from "./api";
import { GifActionTypes, loadGifById, loadGifSuccess } from "./redux";
import { Gif } from "./models";

export const loadGifByIdSaga = function*(
  action: ReturnType<typeof loadGifById>
) {
  try {
    const gif: Gif = yield call(fetchGifById, action.payload.id);
    yield put(loadGifSuccess(gif));
  } catch (e) {
    // do nothing for now
  }
};

export const gifsWatcherSaga = function*() {
  yield takeLatest(GifActionTypes.Load, loadGifByIdSaga);
};
