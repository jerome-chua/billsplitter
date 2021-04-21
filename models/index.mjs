import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import billModel from './bill.mjs';
import itemModel from './item.mjs';
import personModel from './person.mjs';

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};

let sequelize;
if (env === 'production') {
  // For Heroku database url & rebuild configs.
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Bill = billModel(sequelize, Sequelize.DataTypes);
db.Person = personModel(sequelize, Sequelize.DataTypes);
db.Item = itemModel(sequelize, Sequelize.DataTypes);

db.Bill.belongsToMany(db.Person, { through: 'bill_people' });
db.Person.belongsToMany(db.Bill, { through: 'bill_people' });

db.Bill.hasMany(db.Item);
db.Item.belongsTo(db.Bill);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
