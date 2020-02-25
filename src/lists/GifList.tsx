import React, { useEffect, useCallback } from "react";
import { map } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import Infinite from "react-infinite";
import { Link } from "react-router-dom";
import { GifThumbnail } from "../gifs";
import { toFullscreenViewUrl } from "../gifs/urls";
import { loadTrendingGifs, loadMoreTrendingGifs } from "./redux";
import { getAllGifIds, getIsLoadingGifs } from "./selectors";

export const GifList: React.FC = () => {
  const dispatch = useDispatch();
  const gifIds = useSelector(getAllGifIds);
  const isLoading = useSelector(getIsLoadingGifs);

  const handleInfiniteLoad = useCallback(() => {
    dispatch(loadMoreTrendingGifs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadTrendingGifs());
  }, [dispatch]);

  return isLoading ? (
    <LoadingMessage>Loading</LoadingMessage>
  ) : (
    <List
      containerHeight={1000}
      elementHeight={200}
      infiniteLoadBeginEdgeOffset={50}
      onInfiniteLoad={handleInfiniteLoad}
    >
      {map(
        id => (
          <Link key={id} to={toFullscreenViewUrl(id)}>
            <GifThumbnail id={id} />
          </Link>
        ),
        gifIds
      )}
    </List>
  );
};

const List = styled(Infinite)`
  overflow: auto;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingMessage = styled.h1``;
