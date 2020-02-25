import { times } from "ramda";
import { gifsReducer, loadTrendingGifsSuccess } from "./redux";
import { toRandomGif } from "./doubles";

describe("gifs reducer", () => {
  it("should set gifs on load success action", () => {
    const state = [];
    const gifs = times(() => toRandomGif(), 5);
    expect(gifsReducer(state, loadTrendingGifsSuccess(gifs))).toEqual(gifs);
  });
});
