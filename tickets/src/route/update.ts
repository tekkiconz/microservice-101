import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizeError,
} from '@tekkiconztingz/common';
import { Ticket } from '../model/tickets';

const router = express.Router();

router.put(
  '/api/tickets/:ticketId',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than zero'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) throw new NotFoundError();
    if (req.currentUser!.id !== ticket.userId) throw new NotAuthorizeError();
    ticket.title = req.body.title;
    ticket.price = req.body.price;
    await ticket.save();
    res.send(ticket);
  }
);

export { router as updateTicketRouter };
