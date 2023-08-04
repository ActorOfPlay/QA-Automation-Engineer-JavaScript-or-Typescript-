import { LaphilGeneral } from './laphinGeneralPageObj';

export class LaphilSections extends LaphilGeneral {
  getTheSelectedSeat() {
    return cy.get('[class*="seat--selected"]', { timout: 10000 });
  }

  getTheTicketPrice() {
    return cy.get('[class*="price__value"]');
  }

  getTheTicketsDetailsRow() {
    return cy.get('[class="syos-lineitem__title"]', { timeout: 10000 });
  }

  getTheNumberOfTickets() {
    return cy.get('[id*="line-item"]').then((tickets) => tickets.length);
  }

  clickTheBackButton() {
    cy.get('[class*="button--back"]')
      .click();
  }

  clickTheConfirmButton() {
    cy.get('[class="syos-button"]')
      .contains('Confirm')
      .click();
  }

  extractTheSecondSeatNumber() {
    return this.getTheSelectedSeat()
      .invoke('attr', 'id')
      .then((idValue) => {
        const matches = idValue.match(/\d+/);
        const numberValue = parseInt(matches[0]);
        return parseInt(numberValue);
      });
  }

  extractTheSeatNumber() {
    return this.getTheTicketsDetailsRow()
      .invoke('prop', 'innerText')
      .then((property) => {
        const array = property.split(' ');
        const seatNumber = array.pop();

        return seatNumber;
      });
  }

  extractTheTicketPrice() {
    return this.getTheTicketPrice()
      .invoke('text')
      .then((price) => {
        const ticektPrice = +(price.replace('$', ''));
        return ticektPrice;
      });
  }

  extractTheFirstSeatNumber() {
    return this.getTheSelectedSeat()
      .first()
      .invoke('attr', 'id')
      .then((idValue) => {
        const matches = idValue.match(/\d+/);
        const numberValue = parseInt(matches[0]);
        return numberValue;
      });
  }

  assertTheSeatsAreNextToEachOther(seatOne, seatTwo) {
    cy.get(`${seatOne}`).then((firstSeat) => {
      cy.get(`${seatTwo}`).then((secondSeat) => {
        expect(secondSeat - firstSeat).to.be.at.most(2);
      });
    });
  }
}

export const laphilSections = new LaphilSections();
