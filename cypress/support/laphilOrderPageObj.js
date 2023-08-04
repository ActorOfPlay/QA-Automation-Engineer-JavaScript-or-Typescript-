import { LaphilGeneral } from './laphilGeneralPageObj';

export class LaphilOrder extends LaphilGeneral {
  clickTheSkipDonationButton() {
    cy.get('[class*="skip-donation"]')
      .click();
  }

  extractTheOrderTicketPrice() {
    return cy.get('[class="itemPrice"]')
      .first()
      .invoke('text')
      .then((price) => {
        const ticektPrice = +(price.replace('$', ''));
        return ticektPrice;
      });
  }

  assertTheSeatNumberMatch(seatNumberAlias) {
    cy.get(seatNumberAlias).then((seatNumeber) => {
      cy.get('td.item')
        .should('contain.text', seatNumeber);
    });
  }

  assertTheNumberOfTickets(numberOfTicketsAlias) {
    cy.get(numberOfTicketsAlias)
      .then((numberOfTickets) => {
        cy.get('[class="quantity"]')
          .should('contain.text', numberOfTickets);
      });
  }

  assertTicketPricesMatch(ticketPrice, receipeTicketPrice) {
    cy.get(ticketPrice).then((ticketPrice) => {
      cy.get(receipeTicketPrice).then((receipePrice) => {
        expect(receipePrice).to.be.lte(ticketPrice);
      });
    });
  }

  interceptThePaypalRequest() {
    return cy.intercept({
      method: 'POST',
      url: 'https://www.paypal.com/xoplatform/logger/api/logger',
    });
  }

  waitForTheResponse(requestAlias) {
    cy.wait(requestAlias, { timeout: 20000 });
  }
}

export const laphilOrder = new LaphilOrder();
