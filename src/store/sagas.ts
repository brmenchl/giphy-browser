import { all, call } from "redux-saga/effects";
import { gifsWatcherSaga } from "../gifs";

export const rootSaga = function*() {
  yield all([call(gifsWatcherSaga)]);
};
