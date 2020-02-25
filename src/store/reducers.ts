import { combineReducers } from "redux";
import { gifsReducer } from "../gifs";

export const rootReducer = combineReducers({
  gifs: gifsReducer
});
