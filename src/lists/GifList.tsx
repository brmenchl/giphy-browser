import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import Infinite from "react-infinite";
import { Link } from "react-router-dom";
import { GifThumbnail } from "../gifs";
import { toFullscreenViewUrl } from "../pages/urls";
import { loadMoreGifs } from "./redux";
import { getAllGifIds } from "./selectors";

export const GifList: React.FC = () => {
  const dispatch = useDispatch();
  const gifIds = useSelector(getAllGifIds);

  const handleInfiniteLoad = useCallback(() => {
    dispatch(loadMoreGifs());
  }, [dispatch]);

  return (
    <List
      useWindowAsScrollContainer
      elementHeight={420}
      infiniteLoadBeginEdgeOffset={50}
      onInfiniteLoad={handleInfiniteLoad}
    >
      {gifIds.map(id => (
        <Link key={id} to={toFullscreenViewUrl(id)}>
          <ListItem>
            <GifThumbnail id={id} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

const List = styled(Infinite)`
  max-width: 1000px;
  width: 100%;
  margin: auto;
  padding-left: 50px;
  padding-right: 50px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 420px;
`;
