import { times } from "ramda";
import {
  gifListReducer,
  loadGifsSuccess,
  loadTrendingGifs,
  loadMoreGifs,
  loadMoreGifsSuccess,
  loadGifsByQuery
} from "./redux";
import { toRandomGif } from "../gifs/doubles";
import { toRandomGifListReducerState } from "./doubles";
import { toQueryListType, toTrendingListType } from "./models";

describe("gif list reducer", () => {
  it("should set is loading to true and set list type to trending on load trending action", () => {
    const state = toRandomGifListReducerState({
      listType: toQueryListType("lol")
    });
    expect(gifListReducer(state, loadTrendingGifs())).toEqual({
      ...state,
      listType: toTrendingListType(),
      isLoading: true
    });
  });

  it("should set is loading to true and set list type to query on load by query action", () => {
    const state = toRandomGifListReducerState();
    expect(gifListReducer(state, loadGifsByQuery("sup"))).toEqual({
      ...state,
      listType: toQueryListType("sup"),
      isLoading: true
    });
  });

  it("should set pagination is loading to true on load more action", () => {
    const state = toRandomGifListReducerState({
      pagination: {
        isLoading: false,
        offset: 0
      }
    });

    expect(gifListReducer(state, loadMoreGifs())).toEqual({
      ...state,
      pagination: {
        isLoading: true,
        offset: 0
      }
    });
  });

  it("should set ids and is loading to false on load success action", () => {
    const newGifs = times(idx => toRandomGif({ id: `id${idx}` }), 5);
    const state = toRandomGifListReducerState({ ids: [], isLoading: true });
    expect(gifListReducer(state, loadGifsSuccess(newGifs))).toEqual({
      ...state,
      isLoading: false,
      ids: ["id0", "id1", "id2", "id3", "id4"],
      pagination: {
        isLoading: false,
        offset: 0
      }
    });
  });

  it("should update pagination and add new gifs on load more success action", () => {
    const newGif = toRandomGif();
    const state = toRandomGifListReducerState({
      pagination: { offset: 0, isLoading: true }
    });
    expect(
      gifListReducer(state, loadMoreGifsSuccess({ offset: 5, gifs: [newGif] }))
    ).toEqual({
      ...state,
      ids: [...state.ids, newGif.id],
      pagination: {
        isLoading: false,
        offset: 5
      }
    });
  });
});
