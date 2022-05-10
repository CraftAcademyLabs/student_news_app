/* eslint-disable no-undef */
describe("A collection of articles is displayed in the main page", () => {
  beforeEach(() => {
    cy.intercept("GET", "**api/articles**", {
      fixture: "indexRespondsFromApi.json",
      statusCode: 200,
    }).as("indexApiGetRequest");

    cy.visit("/");
    cy.get("[data-cy=minor-news-section]").as("newsSection");
  });

  it("is expected to return a http status response", () => {
    cy.wait("@indexApiGetRequest").its("response.statusCode").should("eq", 200);
  });

  it("is expected to render a Top Story", () => {
    cy.get("[data-cy=top-story]").within(() => {
      cy.get("[data-cy=title]").should(
        "contain.text",
        "World Goes Broke Again"
      );
      cy.get("[data-cy=lede]").should("include.text", "All gone.");
    });
  });

  it("is expected to display a collection of articles", () => {
    cy.get("@newsSection").children().should("have.length", 5);
  });

  it("is expected to display a list of articles sorted by id/index", () => {
    cy.get("@newsSection")
      .children()
      .first()
      .within(() => {
        cy.get("[data-cy=title]").should("contain.text", "TKTK");
        cy.get("[data-cy=lede]").should("contain.text", "TKTK");
        cy.get("[data-cy=authors]").should(
          "contain.text",
          "Dave Mathews"
        );
        cy.get("[data-cy=created_at]").should("contain", "2021-10-05");
      });
  });
});
