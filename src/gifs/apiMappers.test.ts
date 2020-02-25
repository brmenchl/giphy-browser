import faker from "faker";
import { toPaginatedGifs, TrendingGifApiResponse } from "./apiMappers";

describe("toPaginatedGigs", () => {
  it("should map all gifs in the response and pagination offset", () => {
    const url1 = faker.image.image();
    const url2 = faker.image.image();
    const response: TrendingGifApiResponse = {
      data: [
        {
          type: "gif",
          id: "id1",
          title: "love this gif",
          images: {
            original: {
              height: 640,
              width: 480,
              url: url1
            }
          }
        },
        {
          type: "gif",
          id: "id2",
          title: "this is a good gif",
          images: {
            original: {
              height: 640,
              width: 480,
              url: url2
            }
          }
        }
      ],
      pagination: { offset: 20 }
    };
    const { offset, gifs } = toPaginatedGifs(response);

    expect(offset).toEqual(20);
    expect(gifs).toEqual([
      {
        id: "id1",
        title: "love this gif",
        imageUrl: url1
      },
      {
        id: "id2",
        title: "this is a good gif",
        imageUrl: url2
      }
    ]);
  });
});
