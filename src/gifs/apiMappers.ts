import { PaginatedGifs, Gif } from "./models";

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

type ApiGif = {
  type: "gif";
  id: string;
  title: string;
  images: Record<ImageSize, ImageData>;
  // ...
};

type ApiPagination = {
  offset: number;
  // count: number;
};

export type TrendingGifApiResponse = {
  data: ApiGif[];
  pagination: ApiPagination;
};

export const toPaginatedGifs = ({
  data,
  pagination
}: TrendingGifApiResponse): PaginatedGifs => ({
  gifs: data.map(toGif),
  offset: pagination.offset
});

const toGif = (apiGif: ApiGif): Gif => ({
  id: apiGif.id,
  imageUrl: apiGif.images.original.url,
  title: apiGif.title
});
