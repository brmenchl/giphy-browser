import React, { useEffect, useCallback } from "react";
import { map } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import Infinite from "react-infinite";
import { Link } from "react-router-dom";
import { GifThumbnail } from "../gifs";
import { toFullscreenViewUrl } from "../gifs/urls";
import { loadGifs, loadMoreGifs } from "./redux";
import { getAllGifIds, getIsLoadingGifs } from "./selectors";
import { SearchBar } from "./SearchBar";

export const GifList: React.FC = () => {
  const dispatch = useDispatch();
  const gifIds = useSelector(getAllGifIds);
  const isLoading = useSelector(getIsLoadingGifs);

  const handleInfiniteLoad = useCallback(() => {
    dispatch(loadMoreGifs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadGifs());
  }, [dispatch]);

  return (
    <>
      <SearchBar />
      {isLoading ? (
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
      )}
    </>
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
