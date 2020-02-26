import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { StyleReset, GlobalStyles } from "./styles";
import { store } from "./store";
import { gifListUrlScheme } from "./lists/urls";
import { fullscreenViewUrlScheme } from "./gifs/urls";
import { GifList } from "./lists";
import { FullScreenView } from "./gifs";

const App = () => (
  <>
    <StyleReset />
    <GlobalStyles />
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path={gifListUrlScheme} component={GifList} />
          <Route path={fullscreenViewUrlScheme} component={FullScreenView} />
          <Redirect to={gifListUrlScheme} />
        </Switch>
      </Router>
    </Provider>
  </>
);

export default App;
