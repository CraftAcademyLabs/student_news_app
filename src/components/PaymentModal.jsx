import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Input } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  injectStripe,
} from "react-stripe-elements";
import axios from "axios";
import { useTranslation } from "react-i18next";


const PaymentModal = (props) => {
  const open = useSelector((state) => state.displayPaymentModal);
  const { currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const submitPayment = async () => {
    const stripeResponse = await props.stripe.createToken();
    const params = {
      email: currentUser.email,
      stripeToken: stripeResponse.token.id,
      currency: "sek",
      amount: 19900
    };

    try {
      const paymentState = await axios.post(`/api/subscriptions`, params, {
        headers: JSON.parse(localStorage.getItem("J-tockAuth-Storage")),
      });

      toast.success(paymentState.data.message);

      dispatch({ type: "SHOW_PAYMENT_MODAL", payload: false });
      dispatch({ type: "SET_SUBSCRIPTION", payload: true });
    } catch (error) {
      toast.error(stripeResponse.error?.message || error);
    }
  };

  return (
    <>
      <Modal data-cy="subscription-modal" open={open}>
        <Modal.Header>{t("becomeASubscriber")}</Modal.Header>
        <Modal.Content>
          <Input data-cy="email" />
          <div data-cy="card-number">
            <CardNumberElement />
          </div>
          <div data-cy="card-expiry">
            <CardExpiryElement />
          </div>
          <div data-cy="card-cvc">
            <CardCvcElement />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Confirm"
            color="black"
            data-cy="confirm-payment-btn"
            onClick={() => submitPayment()}
          />
          <Button
            content="Cancel"
            labelPosition="right"
            onClick={() =>
              dispatch({
                type: "SHOW_PAYMENT_MODAL",
                payload: false,
              })
            }
          />
        </Modal.Actions>
      </Modal>
      <div data-cy="subscription-toast">
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
    </>
  );
};

export default injectStripe(PaymentModal);
