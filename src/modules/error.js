import store from "../state/store/configureStore";

const errorHandler = (error) => {
  if (error?.response?.status) {
    store.dispatch({
      type: "ERROR_MESSAGE",
      payload:
        "We are sorry! Your request can not be processed at this time. Try again later",
    });
  } else {
    store.dispatch({
      type: "ERROR_MESSAGE",
      payload: error.message,
    });
  }
};

export default errorHandler;
