import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components/macro";
import { useDispatch } from "react-redux";
import { loadGifsByQuery, loadTrendingGifs } from "../../lists";

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const debounceTimeoutId = useRef<number>();

  const clearValue = useCallback(() => {
    setValue("");
    dispatch(loadTrendingGifs());
  }, [setValue, dispatch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  useEffect(() => {
    if (debounceTimeoutId.current) {
      clearTimeout(debounceTimeoutId.current);
      debounceTimeoutId.current = undefined;
    }

    if (value.trim().length) {
      debounceTimeoutId.current = setTimeout(
        () => dispatch(loadGifsByQuery(value)),
        500
      );
    }
  }, [value, dispatch]);

  return (
    <>
      <Label>
        Search by Tag:
        <Input type="text" value={value} onChange={handleChange} />
        <ClearButton onClick={clearValue}>X</ClearButton>
      </Label>
    </>
  );
};

const ClearButton = styled.button`
  align-items: center;
  border-radius: 50%;
  display: inline-flex;
  height: 20px;
  justify-content: center;
  width: 20px;
  margin-left: 5px;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 3px solid darkgray;
  color: darkgray;
  height: 20px;
  margin-left: 5px;
  outline: none;
  padding: 5px;
  width: 400px;

  &:focus {
    color: black;
  }
`;

const Label = styled.label``;
