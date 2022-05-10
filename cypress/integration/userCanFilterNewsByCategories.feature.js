/* eslint-disable no-undef */
describe("GET request to get news by categories", () => {
  beforeEach(() => {
    cy.intercept("GET", "**api/articles", {
      fixture: "indexRespondsFromApi.json",
      statusCode: 200,
    });

    cy.intercept("GET", "**/api/articles/?category**", {
      fixture: "indexResponseForCategory.json",
    });
    cy.visit("/");
  });

  it("is expected to render a category list", () => {
    cy.get("[data-cy=category-list]")
      .click()
      .within(() => {
        cy.get("[data-cy=business-category]").should("contain", "Business");
        cy.get("[data-cy=tech-category]").should("contain", "Tech");
        cy.get("[data-cy=science-category]").should("contain", "Science");
      });
  });

  describe("once the category has been selected", () => {
    beforeEach(() => {
      cy.get("[data-cy=category-list]")
        .click()
        .within(() => {
          cy.get("[data-cy=business-category]").click();
        });
    });
    it("is expected to change the URL to match the new page", () => {
      cy.url().should("eq", "http://localhost:3000/category/business");
    });

    it("is expected to filter articles based on category when category is clicked", () => {
      cy.get("[data-cy=minor-news-section]").should("have.length", 4);
    });
  });
});
