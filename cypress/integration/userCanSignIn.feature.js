describe("User can sign into their account", () => {
  beforeEach(() => {
    cy.intercept("GET", "**api/articles", {
      fixture: "indexRespondsFromApi.json",
    });
    cy.intercept("POST", "**api/auth/sign_in", {
      fixture: "authenticationSuccess.json",
      headers: { uid: "user@email.com" },
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

    cy.get("[data-cy=sign-in-button]").click();
  });

  it("is expected to have two input fields and a submit button", () => {
    cy.get("[data-cy=sign-in-form]").children().should("have.length", 3);
  });

  describe("when the sign in is successful", () => {
    beforeEach(() => {
      cy.get("[data-cy=email-input]").type("user@email.com");
      cy.get("[data-cy=password-input]").type("password");
      cy.get("[data-cy=btn-sign-in]").click();
    });
    it("is expected to display a success message and return to home page", () => {
      cy.get("[data-cy=sign-in-toast]").within(() => {
        cy.contains("Sign In Successful");
      });
      cy.url().should("eq", "http://localhost:3000/");
    });
  });

  describe("When sign in is unsuccessful", () => {
    beforeEach(() => {
      cy.intercept("POST", "**api/auth/sign_in", {
        statusCode: 401,
        fixture: "authenticationFailure.json",
      });
      cy.intercept("GET", "**api/auth/validate_token**", {
        statusCode: 401,
        fixture: "authenticationFailure.json",
      });
      cy.get("[data-cy=email-input]").type("user@email.com");
      cy.get("[data-cy=password-input]").type("wrongPassword");
      cy.get("[data-cy=btn-sign-in]").click();
    });

    it("it is expected to display a error message", () => {
      cy.get("[data-cy=sign-in-toast]").within(() => {
        cy.contains("Invalid login credentials. Please try again.");
      });
    });
  });
});
