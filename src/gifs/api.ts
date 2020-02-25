import axios from "axios";
import { ApiGif, toGif } from "./apiMappers";

type GifByIdApiResponse = {
  data: ApiGif;
};

const toGetGifByIdUrl = (id: string) =>
  `https://api.giphy.com/v1/gifs/${id}?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`;

export const fetchGifById = (id: string) =>
  axios
    .get<GifByIdApiResponse>(toGetGifByIdUrl(id))
    .then(response => toGif(response.data.data));
