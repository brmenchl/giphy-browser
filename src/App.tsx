import React from "react";
import { Provider } from "react-redux";
import { StyleReset } from "./styles";
import { store } from "./store";

const App = () => (
  <>
    <StyleReset />
    <Provider store={store}>
      <div>Hello World</div>
    </Provider>
  </>
);

export default App;
