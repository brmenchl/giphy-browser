import { times } from "ramda";
import {
  getAllGifIds,
  getIsLoadingMoreGifs,
  getCurrentTrendingGifsOffset,
  getIsLoadingGifs
} from "./selectors";
import { toRandomGifListReducerState } from "./doubles";

describe("gif selectors", () => {
  describe("getAllGifIds", () => {
    it("should return ids for all gifs in store", () => {
      const ids = times(idx => `id${idx}`, 5);
      const state = { gifList: toRandomGifListReducerState({ ids }) };
      expect(getAllGifIds(state)).toEqual(["id0", "id1", "id2", "id3", "id4"]);
    });
  });

  describe("getIsLoadingGifs", () => {
    it("should return true if is loading is true", () => {
      const state = {
        gifList: toRandomGifListReducerState({ isLoading: true })
      };
      expect(getIsLoadingGifs(state)).toEqual(true);
    });
  });

  describe("getIsLoadingMoreGifs", () => {
    it("should return true if pagination is loading is true", () => {
      const state = {
        gifList: toRandomGifListReducerState({
          pagination: { isLoading: true, offset: 0 }
        })
      };
      expect(getIsLoadingMoreGifs(state)).toEqual(true);
    });
  });

  describe("getCurrentTrendingGifsOffset", () => {
    it("should return pagination offset", () => {
      const state = {
        gifList: toRandomGifListReducerState({
          pagination: { isLoading: true, offset: 30 }
        })
      };
      expect(getCurrentTrendingGifsOffset(state)).toEqual(30);
    });
  });
});
