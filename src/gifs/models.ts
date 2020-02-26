export type Gif = {
  id: string;
  title: string;
  images: {
    fullscreen: string;
    thumb: string;
  };
};

export type GifWithLoadingState = { isLoading: boolean; data: Gif };
