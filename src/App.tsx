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
import { HomePage, FullScreenViewPage } from "./pages";
import { fullscreenViewUrlScheme, gifListUrlScheme } from "./pages/urls";

const App = () => (
  <>
    <StyleReset />
    <GlobalStyles />
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path={gifListUrlScheme} component={HomePage} />
          <Route
            path={fullscreenViewUrlScheme}
            component={FullScreenViewPage}
          />
          <Redirect to={gifListUrlScheme} />
        </Switch>
      </Router>
    </Provider>
  </>
);

export default App;
