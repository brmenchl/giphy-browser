import { call, put, takeLatest, select } from "redux-saga/effects";
import { fetchGifById } from "./api";
import { toGetGifById } from "./selectors";
import { GifActionTypes, loadGifById, loadGifSuccess } from "./redux";
import { Gif, GifWithLoadingState } from "./models";

export const loadGifByIdSaga = function*(
  action: ReturnType<typeof loadGifById>
) {
  try {
    const loadedGif: GifWithLoadingState | undefined = yield select(
      toGetGifById(action.payload.id)
    );
    if (loadedGif?.data) {
      yield put(loadGifSuccess(loadedGif.data));
    } else {
      const gif: Gif = yield call(fetchGifById, action.payload.id);
      yield put(loadGifSuccess(gif));
    }
  } catch (e) {
    // do nothing for now
  }
};

export const gifsWatcherSaga = function*() {
  yield takeLatest(GifActionTypes.Load, loadGifByIdSaga);
};
