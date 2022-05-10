describe("The Categories render differently on mobile and desktop", () => {
  beforeEach(() => {
    cy.intercept("GET", "**api/articles", {
      fixture: "indexRespondsFromApi.json",
      statusCode: 200,
    });
    cy.visit("/");
  });

  describe("when the user is on mobile", () => {
    it("is expected that the user sees a dropdown menu ", () => {
      cy.viewport("iphone-x");
      cy.get("[data-cy=mobile-menu]").click().within(() => {
        cy.get("[data-cy=mobile-category-list]").click().children().should("have.length", 3);
        cy.get("[data-cy=sign-up-button]").should("be.visible")
        cy.get("[data-cy=sign-in-button]").should("be.visible")
      });
    });
  });
  describe("when the user is on a desktop", () => {
    it("is expected that the user sees a subheader with the news categories listed", () => {
      cy.get("[data-cy=category-list]").should("be.visible");
    });
  });
});
