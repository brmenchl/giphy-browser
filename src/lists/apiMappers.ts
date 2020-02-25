import { ApiGif, toGif } from "../gifs/apiMappers";
import { PaginatedGifs } from "./models";

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
