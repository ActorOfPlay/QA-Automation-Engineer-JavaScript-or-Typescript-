import { laphilGeneral } from '../support/laphilGeneralPageObj.js';
import { laphilSections } from '../support/laphilSectionsPageObj.js';

describe('The ticket ordering page', () => {
  before('Visit the concert hall page', () => {
    laphilGeneral.visitLaphilTicketsPage();
  });

  after('Create a monitoring report', () => {
    laphilGeneral.();
  });

  it('should display available sections for ordering double and separate seats', () => {
    laphilGeneral.addNoSeatsSectionToReport();

    .getAllActiveSections().as('activeSections');

    laphilGeneral.addActiveSectionsNumberToReport();

    cy.get('@activeSections').then((sections) => {
      for (let i = 0; i < sections.length; i++) {
        laphilGeneral.getTheSectionName(sections[]).as(`sectionName_${i}`);

        laphilGeneral.clickOnTheSection(`@sectionName_${i}`);

        laphilGeneral.clickTheContinueToSection().then(() => {
          cy.wait(1500);

          cy.get('body').then((body) => {
            if (laphilGeneral.assertModalWindowVisible(body)) {
              laphilGeneral.assertDoubleSeatsAreUnavailable();
              laphilGeneral.clickTheCloseModalIcon();
              laphilGeneral.addSectionToReportOfSeparated(`sectionName_${i}`);
            } else {
              laphilSections.extractTheFirstSeatNumber().as('firstSeatNumber');
              laphilSections.extractTheSecondSeatNumber().as('secondSeatNumber');
              laphilSections.assertTheSeatsAreNextToEachOther('@firstSeatNumber', '@secondSeatNumber');
              laphilSections.addSectionToReportOfDoubleSeats(`sectionName_${i}`);
              laphilSections.clickTheBackButton();
              laphilSections.clickTheConfirmButton();
            }
          });
        });
      }
    });
  });
});
