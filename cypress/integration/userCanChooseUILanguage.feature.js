describe("Internationalization - UI language", () => {
  beforeEach(() => {
    cy.intercept("GET", "**api/articles", {
      fixture: "indexRespondsFromApi.json",
      statusCode: 200,
    });
  });

  it("is expected to show user UI language selector", () => {
    cy.visit("/");
    cy.get("[data-cy=language-selector]").should("be.visible");
  });

  describe("when the browser is set to English on render", () => {
    beforeEach(() => {
      cy.visit("/", {
        onBeforeLoad(window) {
          Object.defineProperty(window.navigator, "language", {
            get: cy.stub().returns("en-GB").as("language"),
          });
        },
      });
    });
    it("is expected to render the UI in English", () => {
      cy.get("@language").should("have.been.calledOnce");
      cy.get("[data-cy=language-selector]").should(
        "contain.text",
        "Choose Language"
      );
    });

    it("is expected to switch to Swedish when Swedish is manually selected", () => {
      cy.get("[data-cy=language-selector]")
        .click()
        .within(() => {
          cy.contains("Swedish").click();
        });
      cy.get("[data-cy=language-selector]").should("contain.text", "Svenska");
    });
  });

  describe("when the browser is set to Swedish on render", () => {
    beforeEach(() => {
      cy.visit("/", {
        onBeforeLoad(window) {
          Object.defineProperty(window.navigator, "language", {
            get: cy.stub().returns("sv-SE").as("language"),
          });
        },
      });
    });
    it("is expected to render the UI in Swedish", () => {
      cy.get("@language").should("have.been.calledOnce");
      cy.get("[data-cy=language-selector]").should(
        "contain.text",
        "Välj Språk"
      );
    });

    it("is expected to switch to English when English is manually selected", () => {
      cy.get("[data-cy=language-selector]")
        .click()
        .children()
        .last()
        .within(() => {
          cy.contains("Engelska").click();
        });
      cy.get("[data-cy=language-selector]").should("contain.text", "English");
    });
  });
});
