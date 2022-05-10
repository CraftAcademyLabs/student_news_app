describe("User can register for an account", () => {
  beforeEach(() => {
    cy.intercept("GET", "**api/articles", {
      fixture: "indexRespondsFromApi.json",
    });
    cy.intercept("POST", "**api/auth/sign_in", {
      fixture: "authenticationSuccess.json",
      headers: {
        "access-token": "abcd1dMVlvW2BT67xIAS_A",
        "token-type": "Bearer",
        client: "LSJEVZ7Pq6DX5LXvOWMq1w",
        expiry: "1519086891",
        uid: "user@mail.com",
      },
    });
    cy.intercept("POST", "**api/auth**", {
      fixture: "registrationSuccess.json",
    });
    cy.intercept("GET", "**api/auth/validate_token**", {
      fixture: "authenticationSuccess.json",
    });
    cy.visit("/", {
      onBeforeLoad(window) {
        Object.defineProperty(window.navigator, "language", {
          get: cy.stub().returns("en-GB").as("language"),
        });
      },
    });

    cy.get("[data-cy=sign-up-button]").click();
  });

  it("is expected to have three input fields and a submit button", () => {
    cy.get("[data-cy=register-form]").children().should("have.length", 5);
  });

  describe("when registration is successful", () => {
    beforeEach(() => {
      cy.get("[data-cy=name-input]").type("foobar");
      cy.get("[data-cy=email-input]").type("user@email.com");
      cy.get("[data-cy=password-input]").type("password");
      cy.get("[data-cy=confirm-password-input").type("password");
      cy.get("[data-cy=btn-signup]").click();
    });
    it("is expected to display a success message", () => {
      cy.get("[data-cy=registration-message]").should(
        "contain",
        "Registration successful"
      );
    });
    it("is expected to clear the input fields after registration", () => {
      cy.get("body").trigger("keydown", { keyCode: 27 });
      cy.get("body").trigger("keyup", { keyCode: 27 });
      cy.get("[data-cy=name-input] input").should("be.empty");
      cy.get("[data-cy=email-input] input").should("be.empty");
      cy.get("[data-cy=password-input] input").should("be.empty");
      cy.get("[data-cy=confirm-password-input] input").should("be.empty");
    });
  });

  describe("when the registration is unsuccessful", () => {
    it("is expected to return an error message if the email is already taken", () => {
      cy.intercept("POST", "**api/auth**", {
        statusCode: 422,
        body: { error: "Email is already taken" },
      });
      cy.get("[data-cy=name-input]").type("foobar");
      cy.get("[data-cy=email-input]").type("user@email.com");
      cy.get("[data-cy=password-input]").type("password");
      cy.get("[data-cy=confirm-password-input").type("password");
      cy.get("[data-cy=btn-signup]").click();
      cy.get("[data-cy=registration-message").should(
        "contain.text",
        "We are sorry! Your request can not be processed at this time. Try again later"
      );
    });

    it("is expected to return an error message if the passwords don't match", () => {
      cy.get("[data-cy=name-input]").type("foobar");
      cy.get("[data-cy=email-input]").type("user@email.com");
      cy.get("[data-cy=password-input]").type("password");
      cy.get("[data-cy=confirm-password-input").type("not_the_same_password");
      cy.get("[data-cy=btn-signup]").click();
      cy.get("[data-cy=registration-message").should(
        "contain.text",
        "Your passwords are not matching. Try again"
      );
    });
    it("is expected to return an error message if the email is formatted wrong", () => {
      cy.intercept("POST", "**api/auth**", {
        statusCode: 422,
        fixture: "registrationFailure.json",
      });
      cy.get("[data-cy=name-input]").type("foobar");
      cy.get("[data-cy=email-input]").type("useremail.com");
      cy.get("[data-cy=password-input]").type("password");
      cy.get("[data-cy=confirm-password-input").type("password");
      cy.get("[data-cy=btn-signup]").click();
      cy.get("[data-cy=registration-message").should(
        "contain.text",
        "We are sorry! Your request can not be processed at this time. Try again later"
      );
    });
  });
});
