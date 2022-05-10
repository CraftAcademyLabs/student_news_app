import axios from "axios";
import store from "../state/store/configureStore";
import errorHandler from "./error";

const Article = {
  async index(categoryName) {
    const options = categoryName ? { category: categoryName } : {};
    try {
      let response = await axios.get("/api/articles/", {
        params: options,
      });
      store.dispatch({
        type: "SET_ARTICLES_INDEX",
        payload: response.data.articles,
      });
    } catch (error) {
      errorHandler(error);
    }
  },
  async show(articleId) {
    try {
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers: JSON.parse(localStorage.getItem("J-tockAuth-Storage")),
      });
      store.dispatch({
        type: "SHOW_ARTICLE",
        payload: response.data.article,
      });
    } catch (error) {
      errorHandler(error);
    }
  },
};

export { Article };
