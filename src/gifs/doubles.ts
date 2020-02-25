import { times } from "ramda";
import faker from "faker";
import { Gif } from "./models";
import { GifsState } from "./redux";

export const toRandomGif = (mixin: Partial<Gif> = {}): Gif => ({
  id: faker.random.uuid(),
  title: faker.random.words(3),
  imageUrl: faker.image.image(),
  ...mixin
});

export const toRandomGifsReducerState = (
  mixin: Partial<GifsState> = {}
): GifsState => ({
  isLoading: false,
  gifs: times(() => toRandomGif(), 5),
  ...mixin
});
