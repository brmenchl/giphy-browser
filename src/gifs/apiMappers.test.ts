import faker from "faker";
import { toGif } from "./apiMappers";

describe("toGif", () => {
  it("should map correctly", () => {
    const url = faker.image.image();
    expect(
      toGif({
        type: "gif",
        id: "id",
        title: "love this gif",
        images: {
          original: {
            height: 640,
            width: 480,
            url: url
          }
        }
      })
    ).toEqual({
      id: "id",
      title: "love this gif",
      imageUrl: url
    });
  });
});
