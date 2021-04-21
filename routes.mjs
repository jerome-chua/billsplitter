import { resolve } from 'path';
import db from './models/index.mjs';

import initBillsController from './controllers/bills.mjs';
import initItemsController from './controllers/items.mjs';
import initPeopleController from './controllers/people.mjs';

export default function routes(app) {
  const BillsController = initBillsController(db);
  app.post('/billname', BillsController.addBillName);

  const ItemsController = initItemsController(db);
  app.post('/item', ItemsController.addItem);

  const PeopleController = initPeopleController(db);
  app.post('/personname', PeopleController.personName);
  app.get('/names/:billId', PeopleController.getNames);

  // Webpack index.html file (JS Page)
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
