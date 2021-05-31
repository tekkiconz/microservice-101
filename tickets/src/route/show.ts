import express, { Request, Response } from 'express';
import { Ticket } from '../model/tickets';
import { NotFoundError } from '@tekkiconztingz/common';

const router = express.Router();

router.get('/api/tickets/:ticketId', async (req: Request, res: Response) => {
  const ticketId: string = req.params.ticketId;
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) throw new NotFoundError();
  res.send(ticket);
});

export { router as showTicketRouter };
