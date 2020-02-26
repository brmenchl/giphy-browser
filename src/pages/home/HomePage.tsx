import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { SearchBar } from "./SearchBar";
import { GifList, getCurrentListTitle, loadTrendingGifs } from "../../lists";

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const title = useSelector(getCurrentListTitle);

  useEffect(() => {
    dispatch(loadTrendingGifs());
  }, [dispatch]);

  return (
    <>
      <StickyHeader>
        <SearchBar />
        <h1>{title}</h1>
      </StickyHeader>
      <GifList />
    </>
  );
};

const StickyHeader = styled.div`
  color: #ddd;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #333;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
`;
