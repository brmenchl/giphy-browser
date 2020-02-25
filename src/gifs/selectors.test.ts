import { times } from "ramda";
import { getAllGifIds, toGetGifById } from "./selectors";
import { toRandomGif } from "./doubles";

describe("gif selectors", () => {
  describe("getAllGifIds", () => {
    it("should return ids for all gifs in store", () => {
      const gifs = times(idx => toRandomGif({ id: `id${idx}` }), 5);
      const state = { gifs };
      expect(getAllGifIds(state)).toEqual(["id0", "id1", "id2", "id3", "id4"]);
    });
  });

  describe("getGifById", () => {
    const gifs = times(idx => toRandomGif({ id: `id${idx}` }), 5);
    const state = { gifs };
    expect(toGetGifById("id3")(state)).toEqual(gifs[3]);
  });
});
