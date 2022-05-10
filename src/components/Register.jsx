import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Form,
  Input,
  Button,
  Modal,
  Header,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import auth from "../modules/auth";
import errorHandler from "../modules/error";

const Register = () => {
  const dispatch = useDispatch();
  const { error, authenticated, message } = useSelector((store) => store);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  

  const handleAuthentication = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    setOpen(true);
    if (password === confirmPassword) {
      try {
        await auth.signUp({ name: name, email: email, password: password });
        const signInStatus = await auth.signIn(email, password);
        dispatch({
          type: "SET_CURRENT_USER",
          payload: signInStatus.data,
        });
        event.target.reset();
      } catch (error) {
        errorHandler(error);
      }
    } else {
      errorHandler({ message: "Your passwords are not matching. Try again" });
    }
  };

  return (
    <Container>
      <Form data-cy="register-form" onSubmit={handleAuthentication}>
        <Form.Field
          name="name"
          data-cy="name-input"
          control={Input}
          label="Name"
          placeholder="Your name"
        />
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
          name="confirmPassword"
          data-cy="confirm-password-input"
          control={Input}
          label={t("confirmPassword")}
          type="password"
        />
        <Form.Field
          data-cy="btn-signup"
          control={Button}
          content={t("submit")}
        />
      </Form>
      <Modal
        basic
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Modal.Content>
          <Header inverted data-cy="registration-message">
            {authenticated && t("registrationSuccessful")}
            {error && message}
          </Header>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default Register;
