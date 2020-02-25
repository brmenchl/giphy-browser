import { expectSaga } from "redux-saga-test-plan";
import * as Matchers from "redux-saga-test-plan/matchers";
import { fetchGifById } from "./api";
import { loadGifSuccess, loadGifById } from "./redux";
import { toRandomGif } from "./doubles";
import { toGetGifById } from "./selectors";
import { loadGifByIdSaga } from "./sagas";

describe("loadGifByIdSaga", () => {
  it("should fetch gif by id and dispatch a success action on success", () => {
    const gif = toRandomGif();

    return expectSaga(loadGifByIdSaga, loadGifById("foo"))
      .withState({ gifs: {} })
      .provide([[Matchers.call.fn(fetchGifById), gif]])
      .call(fetchGifById, "foo")
      .put(loadGifSuccess(gif))
      .run();
  });

  it("should not fetch gif if it has already been loaded", () => {
    const gif = toRandomGif();

    return expectSaga(loadGifByIdSaga, loadGifById("foo"))
      .withState({
        gifs: {
          foo: {
            data: gif,
            isLoading: false
          }
        }
      })
      .provide([[Matchers.call.fn(fetchGifById), gif]])
      .not.call(fetchGifById, "foo")
      .put(loadGifSuccess(gif))
      .run();
  });
});
