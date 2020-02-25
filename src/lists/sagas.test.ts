import { getCurrentGifsOffset } from "./selectors";
import { GIF_LOAD_LIMIT } from "./models";
import { times } from "ramda";
import { expectSaga } from "redux-saga-test-plan";
import * as Matchers from "redux-saga-test-plan/matchers";
import { dynamic } from "redux-saga-test-plan/providers";
import { fetchTrendingGifs } from "./api";
import { toRandomGif } from "../gifs/doubles";
import {
  loadGifsSuccess,
  loadMoreGifs,
  loadMoreTrendingGifsSuccess
} from "./redux";
import { paginationManagerSaga } from "./sagas";

describe("loadTrendingGifsSaga", () => {
  it("should fetch initial trending gifs and dispatch a success action on success", () => {
    const gifs = times(() => toRandomGif(), 5);
    const paginatedGifs = {
      offset: 0,
      gifs
    };

    return expectSaga(paginationManagerSaga)
      .provide([[Matchers.call(fetchTrendingGifs, 0), paginatedGifs]])
      .call(fetchTrendingGifs, 0)
      .put(loadGifsSuccess(gifs))
      .silentRun(50);
  });

  it("should fetch more gifs on fetch more action and dispatch a success action on success", () => {
    const paginatedGifs = {
      offset: 5,
      gifs: times(() => toRandomGif(), 5)
    };

    const paginatedGifs2 = {
      offset: 5,
      gifs: times(() => toRandomGif(), 5)
    };

    const paginatedGifs3 = {
      offset: 10,
      gifs: times(() => toRandomGif(), 5)
    };

    const mockGifResponse = jest
      .fn()
      .mockReturnValueOnce(paginatedGifs)
      .mockReturnValueOnce(paginatedGifs2)
      .mockReturnValueOnce(paginatedGifs3);

    return (
      expectSaga(paginationManagerSaga)
        .provide([
          [Matchers.call.fn(fetchTrendingGifs), dynamic(mockGifResponse)],
          [Matchers.select(getCurrentGifsOffset), 0]
        ])
        .call(fetchTrendingGifs, 0)
        .put(loadGifsSuccess(paginatedGifs.gifs))
        // FETCHING NEXT CHUNK
        .dispatch(loadMoreGifs())
        .call(fetchTrendingGifs, GIF_LOAD_LIMIT)
        .put(loadMoreTrendingGifsSuccess(paginatedGifs2))
        .silentRun(200)
    );
  });
});
