let numberOfActiveSections = 0;
let sectionsWithDoubleSeats = '';
let sectionsWithTwoSeparateSeats = '';
let sectionWithNoSeats = '';

export class LaphilGeneral {
  visitLaphilTicketsPage() {
    cy.visit('https://my.laphil.com/en/syos2/package/1183');
  }

  getAllActiveSections() {
    return cy.get('[class*="has-zones"]', { timeout: 15000 });
  }

  getTheInactiveSections() {
    return cy.get('[class="unavailable"]', { timeout: 15000 });
  }

  getTheSelectPriceZone() {
    return cy.get('[class="syos-level-selector-container__cta"]');
  }

  getTheModalWindow() {
    return cy.get('[class="syos-modal"]');
  }

  clickBestAvailableTicketButton() {
    cy.get('[class*="bestavailable-order"]')
      .click();
  }

  clickTheContinueToSection() {
    return this.getTheSelectPriceZone()
      .find('button')
      .contains('Continue')
      .click();
  }

  clickTheCloseModalIcon() {
    cy.get('[class="syos-modal__close"]')
      .click();
  }

  clickOnTheSection(section) {
    cy.get(section).then((sectionName) => {
      cy.get(`#${sectionName}`, { timeout: 10000 })
        .click({ force: true });
    });
  }

  clickTheDecreaseSeatsNumber() {
    cy.get('[class*="decrement"]', { timeout: 15000 })
      .click();
  }

  addNoSeatsSectionToReport() {
    this.getTheInactiveSections().each((inactiveSection) => {
      this.getTheSectionName(inactiveSection).then((sectionName) => {
        sectionWithNoSeats += `${sectionName}, `;
      });
    });
  }

  addActiveSectionsNumberToReport() {
    this.getAllActiveSections().then((sections) => {
      numberOfActiveSections = sections.length;
    });
  }

  addSectionToReportOfDoubleSeats(sectionName) {
    return cy.get(`@${sectionName}`).then((sectionName) => sectionsWithDoubleSeats += `${sectionName}, `);
  }

  addSectionToReportOfSeparated(sectionName) {
    return cy.get(`@${sectionName}`).then((sectionName) => sectionsWithTwoSeparateSeats += `${sectionName}, `);
  }

  assertModalWindowVisible(body) {
    return body.find('[class="syos-modal"]').length;
  }

  assertDoubleSeatsAreUnavailable() {
    this.getTheModalWindow()
      .should('contain.text', 'We couldn\'t find 2 seats together');
  }

  getTheSectionName(section) {
    return cy.wrap(section)
      .invoke('attr', 'id')
      .then((sectionName) => sectionName);
  }

  geterateReport() {
    cy.writeFile('./cypress/seats-monitoring-report.json', {
      numberOfActiveSections,
      sectionsWithDoubleSeats,
      sectionsWithTwoSeparateSeats,
      sectionWithNoSeats,
    });
  }
}

export const laphilGeneral = new LaphilGeneral();
