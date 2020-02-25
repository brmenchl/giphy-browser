import axios from "axios";
import { Gif, GIF_LOAD_LIMIT, PaginatedGifs } from "./models";

enum Rating {
  G = "G",
  PG = "PG",
  PG13 = "PG-13",
  R = "R"
}

type ImageData = {
  height: number;
  width: number;
  url: string;
  size: number;
};

type ApiGif = {
  type: "gif";
  id: string;
  url: string;
  slug: string;
  title: string;
  images: Record<string, ImageData>; // Make key type enum
  // ...
};

type ApiPagination = {
  offset: number;
  count: number;
};

type TrendingGifApiResponse = {
  data: ApiGif[];
  pagination: ApiPagination;
};

const toTrendingGifsUrl = ({ offset = 0, rating = Rating.G } = {}) =>
  `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=${GIF_LOAD_LIMIT}&offset=${offset}&rating=${rating}`;

export const fetchTrendingGifs = (offset: number) =>
  axios
    .get<TrendingGifApiResponse>(toTrendingGifsUrl({ offset }))
    .then(response => toPaginatedGifs(response.data));

const toPaginatedGifs = ({
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
