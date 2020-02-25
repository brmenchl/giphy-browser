import axios from "axios";
import { map } from "ramda";
import { Gif } from "./models";

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

type TrendingGifApiResponse = {
  data: ApiGif[];
  // pagination: ApiPagination; Don't need for now
  // meta: ApiMeta; Don't need
};

const toTrendingGifsUrl = ({ limit = 25, rating = Rating.G } = {}) =>
  `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=${limit}&rating=${rating}`;

export const fetchTrendingGifs = () =>
  axios
    .get<TrendingGifApiResponse>(toTrendingGifsUrl())
    .then(response => map(toGif, response.data.data));

const toGif = (apiGif: ApiGif): Gif => ({
  id: apiGif.id,
  imageUrl: apiGif.images.original.url,
  title: apiGif.title
});
