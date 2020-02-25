import { Gif } from "./models";

export type ApiGif = {
  type: "gif";
  id: string;
  title: string;
  images: Record<ImageSize, ImageData>;
  // ...
};

enum ImageSize {
  Original = "original"
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
  imageUrl: apiGif.images.original.url,
  title: apiGif.title
});
