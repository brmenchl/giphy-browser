import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import styled from "styled-components/macro";
import { loadGifById, toGetGifById } from "../../gifs";

export const FullScreenViewPage: React.FC<RouteComponentProps<{
  id: string;
}>> = props => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const getGifById = useCallback(toGetGifById(id), [id]);
  const gif = useSelector(getGifById);
  const goBack = props.history.goBack;

  useEffect(() => {
    dispatch(loadGifById(id));
  }, [id, dispatch]);

  return gif?.data && !gif.isLoading ? (
    <FullScreenImage url={gif.data.images.fullscreen} onClick={goBack} />
  ) : null;
};

const FullScreenImage = styled.div<{ url: string }>`
  background-color: black;
  background-image: url(${props => props.url});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
`;
