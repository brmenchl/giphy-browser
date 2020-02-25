import { times } from "ramda";
import {
  gifsReducer,
  loadTrendingGifsSuccess,
  loadTrendingGifs,
  loadMoreTrendingGifs,
  loadMoreTrendingGifsSuccess
} from "./redux";
import { toRandomGif, toRandomGifsReducerState } from "./doubles";

describe("gifs reducer", () => {
  it("should set is loading to true on load action", () => {
    const gifs = times(() => toRandomGif(), 5);
    const state = toRandomGifsReducerState({ gifs });
    expect(gifsReducer(state, loadTrendingGifs())).toEqual({
      ...state,
      isLoading: true
    });
  });

  it("should set pagination is loading to true on load more action", () => {
    const state = toRandomGifsReducerState({
      pagination: {
        isLoading: false,
        offset: 0
      }
    });

    expect(gifsReducer(state, loadMoreTrendingGifs())).toEqual({
      ...state,
      pagination: {
        isLoading: true,
        offset: 0
      }
    });
  });

  it("should set gifs and is loading to false on load success action", () => {
    const newGifs = times(() => toRandomGif(), 5);
    const state = toRandomGifsReducerState({ gifs: [], isLoading: true });
    expect(gifsReducer(state, loadTrendingGifsSuccess(newGifs))).toEqual({
      isLoading: false,
      gifs: newGifs,
      pagination: {
        isLoading: false,
        offset: 0
      }
    });
  });

  it("should update pagination and add new gifs on load more success action", () => {
    const newGifs = times(() => toRandomGif(), 5);
    const state = toRandomGifsReducerState({
      pagination: { offset: 0, isLoading: true }
    });
    expect(
      gifsReducer(
        state,
        loadMoreTrendingGifsSuccess({ offset: 5, gifs: newGifs })
      )
    ).toEqual({
      ...state,
      gifs: [...state.gifs, ...newGifs],
      pagination: {
        isLoading: false,
        offset: 5
      }
    });
  });
});
