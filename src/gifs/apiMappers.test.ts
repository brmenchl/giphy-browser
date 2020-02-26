import faker from "faker";
import { toGif } from "./apiMappers";

describe("toGif", () => {
  it("should map correctly", () => {
    const url1 = faker.image.image();
    const url2 = faker.image.image();
    expect(
      toGif({
        type: "gif",
        id: "id",
        title: "love this gif",
        images: {
          original: {
            height: 640,
            width: 480,
            url: url1
          },
          downsized_medium: {
            height: 80,
            width: 80,
            url: url2
          }
        }
      })
    ).toEqual({
      id: "id",
      title: "love this gif",
      images: {
        fullscreen: url1,
        thumb: url2
      }
    });
  });
});
