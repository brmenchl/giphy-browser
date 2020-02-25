import { times } from "ramda";
import {
  getAllGifIds,
  toGetGifById,
  getIsLoadingMoreGifs,
  getCurrentTrendingGifsOffset
} from "./selectors";
import { toRandomGif, toRandomGifsReducerState } from "./doubles";

describe("gif selectors", () => {
  describe("getAllGifIds", () => {
    it("should return ids for all gifs in store", () => {
      const gifs = times(idx => toRandomGif({ id: `id${idx}` }), 5);
      const state = { gifs: toRandomGifsReducerState({ gifs }) };
      expect(getAllGifIds(state)).toEqual(["id0", "id1", "id2", "id3", "id4"]);
    });
  });

  describe("getGifById", () => {
    it("should return gif by id", () => {
      const gifs = times(idx => toRandomGif({ id: `id${idx}` }), 5);
      const state = { gifs: toRandomGifsReducerState({ gifs }) };
      expect(toGetGifById("id3")(state)).toEqual(gifs[3]);
    });

    it("should return undefined if id is not found", () => {
      const gifs = times(idx => toRandomGif({ id: `id${idx}` }), 5);
      const state = { gifs: toRandomGifsReducerState({ gifs }) };
      expect(toGetGifById("id100")(state)).toEqual(undefined);
    });
  });

  describe("getIsLoadingMoreGifs", () => {
    it("should return true if pagination is loading is true", () => {
      const state = {
        gifs: toRandomGifsReducerState({
          pagination: { isLoading: true, offset: 0 }
        })
      };
      expect(getIsLoadingMoreGifs(state)).toEqual(true);
    });
  });

  describe("getCurrentTrendingGifsOffset", () => {
    it("should return pagination offset", () => {
      const state = {
        gifs: toRandomGifsReducerState({
          pagination: { isLoading: true, offset: 30 }
        })
      };
      expect(getCurrentTrendingGifsOffset(state)).toEqual(30);
    });
  });
});
