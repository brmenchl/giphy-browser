import { combineReducers } from "redux";
import { gifsReducer } from "../gifs";
import { gifListReducer } from "../lists";

export const rootReducer = combineReducers({
  gifs: gifsReducer,
  gifList: gifListReducer
});
