import React, { useCallback } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { toGetGifById } from "./selectors";

type Props = {
  id: string;
};

export const GifThumbnail: React.FC<Props> = props => {
  const getGifById = useCallback(toGetGifById(props.id), [props.id]);
  const gif = useSelector(getGifById);
  return !!gif?.data ? (
    <Image src={gif.data.images.thumb} alt={gif.data.title} />
  ) : null;
};

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;
