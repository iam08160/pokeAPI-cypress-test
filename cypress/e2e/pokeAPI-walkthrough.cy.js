describe("Full App Runthrough", () => {
  beforeEach(() => {
    //function to visit local host before each test
    cy.visit("localhost:5173");
  });

  it("page load", () => {
    //verifying Search component is rendered
    cy.get('[data-testid="cypress-input"]').should("exist");
    cy.get('[data-testid="cypress-catch"]').should("exist");
    cy.get('[data-testid="cypress-clear"]').should("exist");
  });
  //searching for pokemon
  it("Catch Mon", () => {
    //grabbing the api call and assigning 'alias' to getPikachu
    cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/pikachu").as("getPikachu");
    //user types pikachu in the input field
    cy.get('[data-testid="cypress-input"]').type("pikachu");
    //user clicks catch
    cy.get('[data-testid="cypress-catch"]').click();
    // using alias and waiting for successfull API response. Variables assigned to the response body
    cy.wait("@getPikachu").then((i) => {
      const { name, height, weight, sprites } = i.response.body;
      //confirming the name, height, weight and image are displayed dynamically
      cy.get('[data-testid="cypress-name"]').should("exist").and("contain", name);
      cy.get('[data-testid="cypress-image"]').should("exist").and("have.attr", "src", sprites.front_default);
      cy.get('[data-testid="cypress-height"]').should("exist").and("contain", `Height: ${height}`);
      cy.get('[data-testid="cypress-weight"]').should("exist").and("contain", `Weight: ${weight}`);
    });
  });
  //clearing pokemon
  it("Clear Mon", () => {
    cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/charmander").as("getCharmander");
    cy.get('[data-testid="cypress-input"]').type("charmander");
    cy.get('[data-testid="cypress-catch"]').click();
    cy.wait("@getCharmander").then((i) => {
      const { name, height, weight, sprites } = i.response.body;
      cy.get('[data-testid="cypress-name"]').should("exist").and("contain", name);
      cy.get('[data-testid="cypress-image"]').should("exist").and("have.attr", "src", sprites.front_default);
      cy.get('[data-testid="cypress-height"]').should("exist").and("contain", `Height: ${height}`);
      cy.get('[data-testid="cypress-weight"]').should("exist").and("contain", `Weight: ${weight}`);
    });
    // use clicks clear
    cy.get('[data-testid="cypress-clear"]').click();
    // elements are removed 
    cy.get('[data-testid="cypress-name"]').should("not.exist");
    cy.get('[data-testid="cypress-image"]').should("not.exist");
    cy.get('[data-testid="cypress-height"]').should("not.exist");
    cy.get('[data-testid="cypress-weight"]').should("not.exist");
  });
  //error handling
  it("No Mon Found", () => {
    cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/chuck%20norris").as("getChuckNorris");
    // user types in a non existent pokemon
    cy.get('[data-testid="cypress-input"]').type("chuck norris");
    cy.get('[data-testid="cypress-catch"]').click();
    //failed API call
    cy.wait("@getChuckNorris").its("response.statusCode").should("eq", 404);
    //error is displayed
    cy.get('[data-testid="cypress-fetch-error"]').should("exist").and("contain", "Mon not found");
  });
});