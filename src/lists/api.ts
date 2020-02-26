import axios from "axios";
import { GIF_LOAD_LIMIT, Rating } from "./models";
import { GifListApiResponse, toPaginatedGifs } from "./apiMappers";
import { curry } from "ramda";

type BaseParameters = {
  offset: number;
  rating?: Rating;
};

const toTrendingGifsUrl = ({ offset, rating = Rating.G }: BaseParameters) =>
  `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=${GIF_LOAD_LIMIT}&offset=${offset}&rating=${rating}`;

export const fetchTrendingGifs = (offset: number) =>
  axios
    .get<GifListApiResponse>(toTrendingGifsUrl({ offset }))
    .then(response => toPaginatedGifs(response.data));

const toSearchUrl = ({
  query,
  offset,
  rating = Rating.G
}: { query: string } & BaseParameters) =>
  `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${query}&limit=${GIF_LOAD_LIMIT}&offset=${offset}&rating=${rating}&lang=en`;

export const fetchGifsByQuery = curry((query: string, offset: number) =>
  axios
    .get<GifListApiResponse>(toSearchUrl({ query, offset }))
    .then(response => toPaginatedGifs(response.data))
);
