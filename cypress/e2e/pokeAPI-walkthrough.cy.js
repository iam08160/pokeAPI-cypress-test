describe("Full App Runthrough", () => {
  it("page load", () => {
    cy.visit("localhost:5173");
    cy.get('[data-testid="cypress-input"]').should("exist");
    cy.get('[data-testid="cypress-catch"]').should("exist");
    cy.get('[data-testid="cypress-clear"]').should("exist");
  });
  it("Catch Mon", () => {
    cy.visit("localhost:5173");
    cy.get('[data-testid="cypress-input"]').type("pikachu");
    cy.get('[data-testid="cypress-catch"]').click();
    cy.get('[data-testid="cypress-name"]').should("exist")
    cy.get('[data-testid="cypress-name"]').should("contain", "pikachu");
    cy.get('[data-testid="cypress-height"]').should("exist");
    cy.get('[data-testid="cypress-weight"]').should("exist");
  });
  it("Clear Mon", () => {
    cy.visit("localhost:5173");
    cy.get('[data-testid="cypress-input"]').type("charmander");
    cy.get('[data-testid="cypress-catch"]').click();
    cy.get('[data-testid="cypress-name"]').should("exist")
    cy.get('[data-testid="cypress-name"]').should("contain", "charmander");
    cy.get('[data-testid="cypress-image"]').should("exist");
    cy.get('[data-testid="cypress-height"]').should("exist");
    cy.get('[data-testid="cypress-weight"]').should("exist");
    cy.get('[data-testid="cypress-clear"]').click();
    cy.get('[data-testid="cypress-name"]').should("not.exist");
    cy.get('[data-testid="cypress-image"]').should("not.exist");
    cy.get('[data-testid="cypress-height"]').should("not.exist");
    cy.get('[data-testid="cypress-weight"]').should("not.exist");
  });
  it("No Mon Found", () => {
    cy.visit("localhost:5173");
    cy.get('[data-testid="cypress-input"]').type("butt");
    cy.get('[data-testid="cypress-catch"]').click();
    cy.get('[data-testid="cypress-fetch-error"]').should("exist")
    cy.get('[data-testid="cypress-fetch-error"]').should("contain", "Mon not found");
    
  });
});
