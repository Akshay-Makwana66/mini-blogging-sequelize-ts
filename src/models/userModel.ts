const User = (sequelize:any, DataTypes:any) => {
    const UserModel = sequelize.define('User', {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.ENUM('Mr', 'Mrs', 'Miss'),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      tableName: 'Users'
    });
  
    return UserModel;
  };
  
  export default User;
  