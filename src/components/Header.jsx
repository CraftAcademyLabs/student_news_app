import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Menu, Dropdown, Select, Image, Button } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import logo from "../img/logo.png";
import PaymentModal from "./PaymentModal";
import { Elements } from "react-stripe-elements";

const Header = () => {
  const { categories, authenticated, currentUser, subscribed } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 500px)" });

  let categoriesList = categories.map((category, index) => {
    
    return (
      <Dropdown.Item
        data-cy={`${category}-category`}
        as={Link}
        to={{ pathname: `/category/${category}` }}
        key={index}
      >
        {category}
      </Dropdown.Item>
    );
  });

  const languageOptions = [
    { key: "en", value: "en", text: t("languageNames.english") },
    { key: "sv", value: "sv", text: t("languageNames.swedish") },
  ];

  return (
    <>
      <Menu data-cy="header">
        <Menu.Item
          id="home"
          name="home"
          as={Link}
          to={{ pathname: "/" }}
          data-cy="home"
        >
          <Image size="small" src={logo}></Image>
        </Menu.Item>
        {isTabletOrMobile && (
          <Dropdown
            id="header-font"
            item
            text={t("menu")}
            data-cy="mobile-menu"
          >
            <Dropdown.Menu direction="left">
              <Dropdown
                text={t("categories")}
                item
                data-cy="mobile-category-list"
              >
                <Dropdown.Menu>{categoriesList}</Dropdown.Menu>
              </Dropdown>
              {authenticated ? (
                <>
                  {subscribed ? (
                    <> </>
                  ) : (
                    <Dropdown.Item
                      id="header-font"
                      as={Button}
                      data-cy="subscribe-btn"
                      onClick={() =>
                        dispatch({
                          type: "SHOW_PAYMENT_MODAL",
                          payload: true,
                        })
                      }
                    >
                      Subscribe?
                    </Dropdown.Item>
                  )}
                </>
              ) : (
                <>
                  <Dropdown.Item
                    data-cy="sign-up-button"
                    as={Link}
                    to={{ pathname: "/register" }}
                  >
                    {t("signUp")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    data-cy="sign-in-button"
                    as={Link}
                    to={{ pathname: "/sign-in" }}
                  >
                    {t("signIn")}
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        )}
        {!isTabletOrMobile && (
          <>
            <Menu.Item position="right">
              <Select
                data-cy="language-selector"
                placeholder={t("chooseLanguage")}
                options={languageOptions}
                onChange={(event, data) => {
                  i18n.changeLanguage(data.value);
                }}
              />
            </Menu.Item>
            {authenticated ? (
              <>
                <Menu.Item id="header-font">
                  Welcome {currentUser.name} you are currently{" "}
                  {!subscribed ? "not" : ""} subscribed
                </Menu.Item>
                {subscribed ? (
                  <></>
                ) : (
                  <Menu.Item
                    id="header-font"
                    name={t("subscribed")}
                    as={Button}
                    data-cy="subscribe-btn"
                    onClick={() =>
                      dispatch({
                        type: "SHOW_PAYMENT_MODAL",
                        payload: true,
                      })
                    }
                  />
                )}
              </>
            ) : (
              <>
                <Menu.Item
                  id="header-font"
                  name={t("signIn")}
                  as={Link}
                  to={{ pathname: "/sign-in" }}
                  data-cy="sign-in-button"
                />
                <Menu.Item
                  id="header-font"
                  name={t("signUp")}
                  as={Link}
                  to={{ pathname: "/register" }}
                  data-cy="sign-up-button"
                />
              </>
            )}
          </>
        )}
      </Menu>
      {isTabletOrMobile && (
        <Select
          data-cy="language-selector"
          placeholder={t("chooseLanguage")}
          options={languageOptions}
          onChange={(event, data) => {
            i18n.changeLanguage(data.value);
          }}
        />
      )}
      <Elements>
        <PaymentModal />
      </Elements>
    </>
  );
};

export default Header;
