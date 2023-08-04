import { laphilSections } from '../support/laphineSectionsPageObj';
import { laphilOrder } from '../support/laphinOrderPageObj';

describe('User on concert hall page', () => {
  before('Visit the concert hall page', () => {
    laphilOrder.visitLaphilTicketsPage();
  });

  it('should be able to purchase a ticket', () => {
    laphilOrder.clickTheDecreaseSeatsNumber();

    laphilOrder.clickBestAvailableTicketButton();

    laphilOrder.clickTheContinueToSection();

    laphilSections.extractTheSeatNumber().as('ticketSeatNumber');

    laphilSections.extractTheTicketPrice().as('ticketPrice');

    laphilSections.getTheNumberOfTickets().as('numberOfTickets');

    laphilOrder.interceptThePaypalRequest().as('modalWindowRequest');

    laphilSections.clickTheConfirmButton();

    laphilOrder.waitForTheResponse('@modalWindowRequest');

    laphilOrder.clickTheSkipDonationButton();

    laphilOrder.assertTheNumberOfTickets('@numberOfTickets');

    laphilOrder.assertTheSeatNumberMatch('@ticketSeatNumber');

    laphilOrder.extractTheOrderTicketPrice().as('orderTicketPrice');

    laphilOrder.assertTicketPricesMatch('@ticketPrice', '@orderTicketPrice');
  });
});
