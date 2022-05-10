/* eslint-disable no-undef */
describe("User can pay for subscription", () => {
  beforeEach(() => {
    cy.intercept("GET", "**api/articles**", {
      fixture: "indexRespondsFromApi.json",
    });

    cy.intercept("POST", "**api/subscription**", {
      body: { message: "You have successfully subscribed", paid: true },
      statusCode: 201,
    }).as("subscriptionRequest");
    cy.intercept("POST", "https://r.stripe.com/0", { statusCode: 201 });
  });

  describe("when the payment is successful", () => {
    it("is expected that clicking on the subscribe button will open a modal", () => {
      cy.visit("/");
      cy.window().its("store").invoke("dispatch", {
        type: "SET_CURRENT_USER",
        payload: true,
      });
      cy.get("[data-cy=subscribe-btn]").click();
      cy.get("[data-cy=subscription-modal]").should("be.visible");
    });

    it("is expected that the user can enter their card details", () => {
      cy.get("[data-cy=subscription-modal]").within(() => {
        cy.get("[data-cy=email]").type("guy@random.com");

        cy.get("div[data-cy=card-number]").within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body)
              .find('input[name="cardnumber"]')
              .type("4242424242424242", { delay: 2 });
          });
        });

        cy.get("div[data-cy=card-expiry]").within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body)
              .find('input[name="exp-date"]')
              .type("1222", { delay: 2 });
          });
        });

        cy.get("div[data-cy=card-cvc]").within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).find('input[name="cvc"]').type("123", { delay: 10 });
          });
        });
      });
    });

    it("is expected to display a success message upon subscribing", () => {
      cy.get("[data-cy=confirm-payment-btn]").click();
      cy.wait("@subscriptionRequest")
        .its("response.statusCode")
        .should("eq", 201, { delay: 10 });
      cy.get("[data-cy=subscription-toast]").within(() => {
        cy.contains("You have successfully subscribed", { delay: 10 });
      });
    });
  });

  describe("when the payment is unsuccessful", () => {
    beforeEach(() => {
      cy.intercept("POST", "**api/subscription**", {
        body: { error: "Your card number is incomplete", paid: false },
        statusCode: 403,
      });
      cy.intercept("POST", "https://r.stripe.com/0", { statusCode: 403 });
    });

    it("is expected that entering no card details will lead to an error message", () => {
      cy.visit("/");
      cy.window().its("store").invoke("dispatch", {
        type: "SET_CURRENT_USER",
        payload: true,
      });
      cy.get("[data-cy=subscribe-btn]").click();
      cy.get("[data-cy=subscription-modal]").within(() => {
        cy.get("[data-cy=email]").type("guy@random.com", { delay: 10 });
        cy.get("[data-cy=confirm-payment-btn]").click();
      });

      cy.get("[data-cy=subscription-toast]").within(() => {
        cy.contains("Kortnumret är ofullständigt", { delay: 10 });
      });
    });

    it("is expected that entering fake card details will lead to an error", () => {
      cy.visit("/");
      cy.window().its("store").invoke("dispatch", {
        type: "SET_CURRENT_USER",
        payload: true,
      });
      cy.get("[data-cy=subscribe-btn]").click();

      cy.get("[data-cy=subscription-modal]").within(() => {
        cy.get("[data-cy=email]").type("guy@random.com", { delay: 10 });

        cy.get("div[data-cy=card-number]").within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body)
              .find('input[name="cardnumber"]')
              .type("4242424242424211", { delay: 2 });
          });
        });

        cy.get("div[data-cy=card-expiry]").within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body)
              .find('input[name="exp-date"]')
              .type("1222", { delay: 10 });
          });
        });

        cy.get("div[data-cy=card-cvc]").within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).find('input[name="cvc"]').type("113", { delay: 10 });
          });
        });
        cy.get("[data-cy=confirm-payment-btn]").click();
      });

      cy.get("[data-cy=subscription-toast]").within(() => {
        cy.contains("Ditt kortnummer är ogiltigt", { delay: 10 });
      });
    });
  });
});
