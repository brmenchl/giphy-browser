import { times } from "ramda";
import faker from "faker";
import { Gif, GifWithLoadingState } from "./models";
import { GifsState } from "./redux";

export const toRandomGif = (mixin: Partial<Gif> = {}): Gif => ({
  id: faker.random.uuid(),
  title: faker.random.words(3),
  images: {
    fullscreen: faker.image.image(),
    thumb: faker.image.image()
  },
  ...mixin
});

export const toRandomGifWithLoadingState = (
  mixin: Partial<GifWithLoadingState> = {}
): GifWithLoadingState => ({
  data: toRandomGif(),
  isLoading: faker.random.boolean(),
  ...mixin
});

export const toRandomGifsReducerState = (
  mixin: Partial<GifsState>
): GifsState => ({
  ...times(() => toRandomGif(), 5).reduce(
    (acc, gif) => ({
      ...acc,
      [gif.id]: gif
    }),
    {}
  ),
  ...mixin
});
