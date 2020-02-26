import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadGifsByQuery } from "./redux";

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const debounceTimeoutId = useRef<number>();

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
    <label>
      Search by Tag:
      <input type="text" value={value} onChange={handleChange} />
    </label>
  );
};
