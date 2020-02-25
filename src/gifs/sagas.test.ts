import { times } from "ramda";
import { expectSaga } from "redux-saga-test-plan";
import * as Matchers from "redux-saga-test-plan/matchers";
import { fetchTrendingGifs } from "./api";
import { toRandomGif } from "./doubles";
import { loadTrendingGifsSuccess } from "./redux";
import { loadTrendingGifsSaga } from "./sagas";

describe("loadTrendingGifsSaga", () => {
  it("should fetch trending gifs and dispatch a success action on success", () => {
    const gifs = times(() => toRandomGif(), 5);

    return expectSaga(loadTrendingGifsSaga)
      .provide([[Matchers.call(fetchTrendingGifs), gifs]])
      .call(fetchTrendingGifs)
      .put(loadTrendingGifsSuccess(gifs))
      .run();
  });
});
