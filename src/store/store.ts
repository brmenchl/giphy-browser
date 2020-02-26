import { compose } from "ramda";
import createSagaMiddleware from "redux-saga";
import sagaMonitor from "@redux-saga/simple-saga-monitor";
import { createStore, applyMiddleware, StoreEnhancer } from "redux";
import { rootReducer } from "./reducers";
import { rootSaga } from "./sagas";

type WindowWithReduxDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => StoreEnhancer<unknown, {}>;
};

const doesReduxDevtoolsExtenstionExist = (
  w: Window | WindowWithReduxDevTools
): w is WindowWithReduxDevTools => "__REDUX_DEVTOOLS_EXTENSION__" in w;

const composeEnhancers =
  typeof window !== "undefined" && doesReduxDevtoolsExtenstionExist(window)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
