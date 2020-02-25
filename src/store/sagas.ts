import { all, call } from "redux-saga/effects";
import { gifsWatcherSaga } from "../gifs";
import { gifListWatcherSaga } from "../lists";

export const rootSaga = function*() {
  yield all([call(gifsWatcherSaga), call(gifListWatcherSaga)]);
};
