import faker from "faker";
import { Gif } from "./models";

export const toRandomGif = (mixin: Partial<Gif> = {}): Gif => ({
  id: faker.random.uuid(),
  title: faker.random.words(3),
  imageUrl: faker.image.image(),
  ...mixin
});
