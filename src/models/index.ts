import {config} from "dotenv";
config();
import { Sequelize, DataTypes } from 'sequelize';
import Blog from './blogModel';
import User from './userModel';

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(`${process.env.DATABASE_NAME}`, `${process.env.USER_NAME}`, `${process.env.DATABASE_PASSWORD}`, {
  dialect: "mysql",
  host: `${process.env.DATABASE_HOST}`,
  logging: false,
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
    blog: Blog(sequelize, DataTypes),
    user: User(sequelize, DataTypes),
  };
  
  (async () => {  
    await db.sequelize.sync({ force: false });
  })();
 
export default db;
