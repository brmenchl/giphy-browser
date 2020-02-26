import { Gif } from "./models";

export type ApiGif = {
  type: "gif";
  id: string;
  title: string;
  images: Record<ImageSize, ImageData>; // And other stuff that I don't need
  // ...
};

enum ImageSize {
  Original = "original", // fullscreen size
  DownSizedMedium = "downsized_medium" // guaranteed under 5mb
  // ...
}

type ImageData = {
  height: number;
  width: number;
  url: string;
  // size: number;
};

export const toGif = (apiGif: ApiGif): Gif => ({
  id: apiGif.id,
  images: {
    fullscreen: apiGif.images.original.url,
    thumb: apiGif.images.downsized_medium.url
  },
  title: apiGif.title
});
