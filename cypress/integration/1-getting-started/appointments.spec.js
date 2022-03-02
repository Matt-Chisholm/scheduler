describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });
  it("should book an appointment", () => {
    cy.get(
      ":nth-child(2) > .appointment__add > .appointment__add-button"
    ).click();
    cy.get('[data-testid="student-name-input"]').type("Lydia Miller-Jones");
    cy.get(
      ".appointment__card-left > .interviewers > .interviewers__list > :nth-child(1) > .interviewers__item-image"
    ).click();
    cy.contains("Save").click();
    cy.wait(2000);
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get(
      ".appointment__card-left > .interviewers > .interviewers__list > :nth-child(2) > .interviewers__item-image"
    ).click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").first().click({ force: true });
    cy.get(".appointment__actions > :nth-child(2)").click();
    cy.contains("DELETING").should("exist");
    cy.contains("DELETING").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
