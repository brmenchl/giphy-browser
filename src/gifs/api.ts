import axios from "axios";
import { GIF_LOAD_LIMIT, Rating } from "./models";
import { TrendingGifApiResponse, toPaginatedGifs } from "./apiMappers";

const toTrendingGifsUrl = ({ offset = 0, rating = Rating.G } = {}) =>
  `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=${GIF_LOAD_LIMIT}&offset=${offset}&rating=${rating}`;

export const fetchTrendingGifs = (offset: number) =>
  axios
    .get<TrendingGifApiResponse>(toTrendingGifsUrl({ offset }))
    .then(response => toPaginatedGifs(response.data));
