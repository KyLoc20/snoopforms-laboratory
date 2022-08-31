describe("empty spec", () => {
  it("passes", () => {
    cy.visit("/");
  });
});
describe("My First Test", () => {
  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });
});
