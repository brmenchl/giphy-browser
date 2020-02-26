import faker from "faker";
import { toPaginatedGifs, GifListApiResponse } from "./apiMappers";

describe("toPaginatedGigs", () => {
  it("should map all gifs in the response and pagination offset", () => {
    const url1 = faker.image.image();
    const url2 = faker.image.image();
    const url3 = faker.image.image();
    const url4 = faker.image.image();
    const response: GifListApiResponse = {
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
            },
            downsized_medium: {
              height: 640,
              width: 480,
              url: url2
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
              url: url3
            },
            downsized_medium: {
              height: 640,
              width: 480,
              url: url4
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
        images: {
          fullscreen: url1,
          thumb: url2
        }
      },
      {
        id: "id2",
        title: "this is a good gif",
        images: {
          fullscreen: url3,
          thumb: url4
        }
      }
    ]);
  });
});
