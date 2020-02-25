import React from "react";
import { Provider } from "react-redux";
import { StyleReset } from "./styles";
import { store } from "./store";
import { GifList } from "./gifs";

const App = () => (
  <>
    <StyleReset />
    <Provider store={store}>
      <GifList />
    </Provider>
  </>
);

export default App;
