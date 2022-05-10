import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Category from "./components/Category";
import CategoryHeader from "./components/CategoryHeader";
import IndividualArticle from "./components/IndividualArticle";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import i18n from "./i18n";

const App = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 500px)" });

  if (navigator.language.includes("sv")) {
    i18n.changeLanguage("sv");
  }

  return (
    <BrowserRouter>
      <Header />
      {!isTabletOrMobile && <CategoryHeader />}
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route
          exact
          path={"/articles/:id"}
          component={IndividualArticle}
        ></Route>
        <Route exact path={"/category/:category"} component={Category}></Route>
        <Route exact path={"/register"} component={Register}></Route>
        <Route exact path={"/sign-in"} component={SignIn}></Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
