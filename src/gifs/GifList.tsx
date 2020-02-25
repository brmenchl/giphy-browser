import React, { useEffect } from "react";
import { map } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { loadTrendingGifs } from "./redux";
import { getAllGifIds, getIsLoadingGifs } from "./selectors";
import { GifThumbnail } from "./GifThumbnail";

export const GifList: React.FC = () => {
  const dispatch = useDispatch();
  const gifIds = useSelector(getAllGifIds);
  const isLoading = useSelector(getIsLoadingGifs);

  useEffect(() => {
    dispatch(loadTrendingGifs());
  }, [dispatch]);

  return isLoading ? (
    <LoadingMessage>Loading</LoadingMessage>
  ) : (
    <List>
      {map(
        id => (
          <GifThumbnail key={id} id={id} />
        ),
        gifIds
      )}
    </List>
  );
};

const List = styled.div`
  overflow: auto;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingMessage = styled.h1``;
