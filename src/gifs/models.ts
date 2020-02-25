export type Gif = {
  id: string;
  title: string;
  imageUrl: string;
};

export type GifWithLoadingState = { isLoading: boolean; data: Gif };
