import { times } from "ramda";
import faker from "faker";
import { GifListState } from "./redux";

export const toRandomGifListReducerState = (
  mixin: Partial<GifListState> = {}
): GifListState => ({
  isLoading: false,
  ids: times(() => faker.random.uuid(), 5),
  pagination: {
    isLoading: false,
    offset: 0
  },
  ...mixin
});
