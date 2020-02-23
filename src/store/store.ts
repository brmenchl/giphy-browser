import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, StoreEnhancer } from "redux";
import { rootReducer } from "./reducers";
import { rootSaga } from "./sagas";
import { compose } from "ramda";

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => StoreEnhancer<unknown, {}>;
};

const doesReduxDevtoolsExtenstionExist = (
  w: Window | WindowWithDevTools
): w is WindowWithDevTools => "__REDUX_DEVTOOLS_EXTENSION__" in w;

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window !== "undefined" && doesReduxDevtoolsExtenstionExist(window)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
