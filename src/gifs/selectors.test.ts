import { times } from "ramda";
import { toRandomGif, toRandomGifsReducerState } from "./doubles";
import { toGetGifById } from "./selectors";
import { gifsReducer, updateGifs } from "./redux";

describe("getGifById", () => {
  it("should return gif by id", () => {
    const gifs = times(idx => toRandomGif({ id: `id${idx}` }), 5);
    const state = gifsReducer(undefined, updateGifs(gifs));
    expect(toGetGifById("id3")({ gifs: state })).toEqual({
      data: gifs[3],
      isLoading: false
    });
  });

  it("should return gif is loading if loading", () => {
    const gif = toRandomGif({ id: "foo" });
    const state = {
      foo: {
        data: gif,
        isLoading: true
      }
    };

    expect(toGetGifById("foo")({ gifs: state })).toEqual({
      data: gif,
      isLoading: true
    });
  });

  it("should return undefined if id is not found", () => {
    const gifs = times(idx => toRandomGif({ id: `id${idx}` }), 5);
    const state = gifsReducer(undefined, updateGifs(gifs));
    expect(toGetGifById("id100")({ gifs: state })).toEqual(undefined);
  });
});
