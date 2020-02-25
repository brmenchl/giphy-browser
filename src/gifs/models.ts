export const GIF_LOAD_LIMIT = 25;

export type Gif = {
  id: string;
  title: string;
  imageUrl: string;
};

export type PaginatedGifs = {
  offset: number;
  gifs: Gif[];
}