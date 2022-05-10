describe("User can browser through the app", () => {
  beforeEach(() => {
    cy.intercept("GET", "**api/articles**", {
      fixture: "indexRespondsFromApi.json",
      delay: 5000,
    });
    cy.visit("/");
  });

  it("is expected to display a header", () => {
    cy.get("[data-cy=header]").should("be.visible");
  });

  it("is expected to display a footer", () => {
    cy.get("[data-cy=footer]").should("contain", "Copyright");
  });

  it("is expected to display a loading symbol while getting articles", () => {
    cy.get("[data-cy=loading-symbol]").should("be.visible");
  });
});
