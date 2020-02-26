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
      <StickyHeader>
        <SearchBar />
      </StickyHeader>
      {isLoading ? (
        <LoadingMessage>Loading</LoadingMessage>
      ) : (
        <List
          useWindowAsScrollContainer
          elementHeight={420}
          infiniteLoadBeginEdgeOffset={50}
          onInfiniteLoad={handleInfiniteLoad}
        >
          {map(
            id => (
              <FullscreenLink key={id} to={toFullscreenViewUrl(id)}>
                <ListItem key={id}>
                  <GifThumbnail id={id} />
                </ListItem>
              </FullscreenLink>
            ),
            gifIds
          )}
        </List>
      )}
    </>
  );
};

const FullscreenLink = styled(Link)``;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 420px;
`;

const List = styled(Infinite)`
  max-width: 1000px;
  width: 100%;
  margin: auto;
  padding-left: 50px;
  padding-right: 50px;
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: grey;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
`;

const LoadingMessage = styled.h1``;
