import { getCurrentTrendingGifsOffset } from "./selectors";
import { GIF_LOAD_LIMIT } from "./models";
import { times } from "ramda";
import { expectSaga } from "redux-saga-test-plan";
import * as Matchers from "redux-saga-test-plan/matchers";
import { fetchTrendingGifs } from "./api";
import { toRandomGif } from "./doubles";
import {
  loadTrendingGifsSuccess,
  loadMoreTrendingGifs,
  loadMoreTrendingGifsSuccess,
  gifsReducer
} from "./redux";
import { loadTrendingGifsSaga } from "./sagas";
import { dynamic } from "redux-saga-test-plan/providers";

describe("loadTrendingGifsSaga", () => {
  it("should fetch initial trending gifs and dispatch a success action on success", () => {
    const gifs = times(() => toRandomGif(), 5);
    const paginatedGifs = {
      offset: 0,
      gifs
    };

    return expectSaga(loadTrendingGifsSaga)
      .provide([[Matchers.call(fetchTrendingGifs, 0), paginatedGifs]])
      .call(fetchTrendingGifs, 0)
      .put(loadTrendingGifsSuccess(gifs))
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
      expectSaga(loadTrendingGifsSaga)
        .provide([
          [Matchers.call.fn(fetchTrendingGifs), dynamic(mockGifResponse)],
          [Matchers.select(getCurrentTrendingGifsOffset), 0]
        ])
        .call(fetchTrendingGifs, 0)
        .put(loadTrendingGifsSuccess(paginatedGifs.gifs))
        // FETCHING NEXT CHUNK
        .dispatch(loadMoreTrendingGifs())
        .call(fetchTrendingGifs, GIF_LOAD_LIMIT)
        .put(loadMoreTrendingGifsSuccess(paginatedGifs2))
        .silentRun(200)
    );
  });
});
