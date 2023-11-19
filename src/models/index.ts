import { Sequelize, DataTypes,Model } from 'sequelize';

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('minisequelize', 'akshay makwana', 'akki66', {
  host: 'localhost',
  // logging: false,
  dialect:  'mysql',
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  
  interface DB {
    Sequelize: typeof Sequelize;
    sequelize: Sequelize;
    blog?: any; // Replace 'any' with the actual type of the blog model
    user?: any; // Replace 'any' with the actual type of the user model
  }
  
  const db: DB = {
    Sequelize,
    sequelize,
  };
  
  (async () => {
    db.blog = require('./blogModel')(sequelize, DataTypes);
    db.user = require('./userModel')(sequelize, DataTypes);
  
    await db.sequelize.sync({ force: false });
  })();
 
export default db;
