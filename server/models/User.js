// models/User.js
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(
    'Users',
     {
  empid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    updatedAt: "UpdatedAt",
    createdAt: "CreatedAt",
  }
 );
 return User;

}