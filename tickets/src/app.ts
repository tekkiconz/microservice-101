import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { NotFoundError } from '@tekkiconztingz/common';
import { errorHander } from '@tekkiconztingz/common';
import { currentUser } from '@tekkiconztingz/common';

import { createTicketRouter } from './route/new';
import { showTicketRouter } from './route/show';
import { indexTicketRouter } from './route/index';
import { updateTicketRouter } from './route/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHander);

export { app };
