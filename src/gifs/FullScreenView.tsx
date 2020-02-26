import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import styled from "styled-components/macro";
import { loadGifById } from "./redux";
import { toGetGifById } from "./selectors";

export const FullScreenView: React.FC<RouteComponentProps<{
  id: string;
}>> = props => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const getGifById = useCallback(toGetGifById(id), [id]);
  const gif = useSelector(getGifById);
  const goBack = () => window.history.back();

  useEffect(() => {
    dispatch(loadGifById(id));
  }, [id, dispatch]);

  return gif?.data && !gif.isLoading ? (
    <FullScreenImage src={gif.data.images.fullscreen} onClick={goBack} />
  ) : null;
};

const FullScreenImage = styled.img`
  width: 100%;
  cursor: pointer;
`;
