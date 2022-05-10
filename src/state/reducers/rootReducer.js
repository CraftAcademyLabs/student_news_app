const rootReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_PAYMENT_MODAL":
      return {
        ...state,
        displayPaymentModal: action.payload,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "ERROR_MESSAGE":
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        flashMessage: action.payload,
      };
    case "SET_ARTICLES_INDEX":
      return {
        ...state,
        articles: action.payload,
        article: null,
      };
    case "SHOW_ARTICLE":
      return {
        ...state,
        article: action.payload,
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
        authenticated: true,
      };
    case "SET_SUBSCRIPTION":
      return {
        ...state,
        currentUser: action.payload,
        subscribed: true,
      };
    default:
      return state;
  }
};
export default rootReducer;
