import { times } from "ramda";
import {
  gifsReducer,
  loadTrendingGifsSuccess,
  loadTrendingGifs
} from "./redux";
import { toRandomGif } from "./doubles";

describe("gifs reducer", () => {
  it("should set is loading to true on load action", () => {
    const gifs = times(() => toRandomGif(), 5);
    const state = {
      isLoading: false,
      gifs
    };
    expect(gifsReducer(state, loadTrendingGifs())).toEqual({
      isLoading: true,
      gifs
    });
  });

  it("should set gifs and is loading to false on load success action", () => {
    const newGifs = times(() => toRandomGif(), 5);
    const state = {
      isLoading: true,
      gifs: []
    };
    expect(gifsReducer(state, loadTrendingGifsSuccess(newGifs))).toEqual({
      isLoading: false,
      gifs: newGifs
    });
  });
});
