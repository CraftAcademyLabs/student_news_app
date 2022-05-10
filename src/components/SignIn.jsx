import React from "react";
import { Container, Form, Button, Input } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import auth from "../modules/auth";
import delay from "delay";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const signInStatus = await auth.signIn(email, password);
      dispatch({
        type: "SET_CURRENT_USER",
        payload: signInStatus.data,
      });

      toast.success(t("signInMessage"));

      await delay(2000);
      history.push("/");
    } catch (error) {
      toast.error(error.response.data.errors[0]);
    }
  };

  return (
    <Container>
      <Form data-cy="sign-in-form" onSubmit={handleSignIn}>
        <Form.Field
          name="email"
          data-cy="email-input"
          control={Input}
          label="Email"
          placeholder="example@email.com"
        />
        <Form.Field
          name="password"
          data-cy="password-input"
          control={Input}
          label={t("password")}
          type="password"
        />
        <Form.Field
          data-cy="btn-sign-in"
          control={Button}
          content={t("submit")}
        />
      </Form>
      <div data-cy="sign-in-toast">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Container>
  );
};

export default SignIn;
