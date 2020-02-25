import { ApiGif, toGif } from "../gifs/apiMappers";
import { PaginatedGifs } from "./models";

type ApiPagination = {
  offset: number;
  // count: number;
};

export type GifListApiResponse = {
  data: ApiGif[];
  pagination: ApiPagination;
};

export const toPaginatedGifs = ({
  data,
  pagination
}: GifListApiResponse): PaginatedGifs => ({
  gifs: data.map(toGif),
  offset: pagination.offset
});
