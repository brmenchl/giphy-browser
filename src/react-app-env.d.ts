/// <reference types="react-scripts" />
/// <reference path="../typings/simple-saga-monitor.d.ts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_GIPHY_API_KEY: string;
  }
}
