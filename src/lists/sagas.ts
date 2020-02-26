import { call, put, select, takeLatest, take } from "redux-saga/effects";
import { updateGifs } from "../gifs";
import { fetchTrendingGifs, fetchGifsByQuery } from "./api";
import { PaginatedGifs, GIF_LOAD_LIMIT } from "./models";
import {
  loadGifsSuccess,
  GifListActionTypes,
  loadMoreGifsSuccess,
  loadGifsByQuery,
  loadGifs
} from "./redux";
import { getCurrentGifsOffset } from "./selectors";

type FetchGifs = (offset: number) => Promise<PaginatedGifs>;

export const loadGifsSaga = function*(
  fetchGifs: FetchGifs,
  isInitialLoad: boolean,
  offset: number
) {
  const paginatedGifs: PaginatedGifs = yield call(fetchGifs, offset);
  if (isInitialLoad) {
    yield put(loadGifsSuccess(paginatedGifs.gifs));
  } else {
    yield put(loadMoreGifsSuccess(paginatedGifs));
  }
  yield put(updateGifs(paginatedGifs.gifs));
};

export const paginationManagerSaga = function*(
  action: ReturnType<typeof loadGifs | typeof loadGifsByQuery>
) {
  try {
    const fetchGifs =
      action.type === GifListActionTypes.Load
        ? fetchTrendingGifs
        : fetchGifsByQuery(action.payload.query);

    yield call(loadGifsSaga, fetchGifs, true, 0);

    while (true) {
      yield take(GifListActionTypes.LoadMore);
      const currentOffset: number = yield select(getCurrentGifsOffset);
      yield call(
        loadGifsSaga,
        fetchGifs,
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
    [GifListActionTypes.Load, GifListActionTypes.LoadByQuery],
    paginationManagerSaga
  );
};
