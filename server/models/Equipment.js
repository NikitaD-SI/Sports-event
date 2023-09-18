// models/Equipment.js
module.exports = function(sequelize, DataTypes) {
    const equipments = sequelize.define(
    'Equipments',
    {
    sport: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Equipname: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
    {
      updatedAt: "UpdatedAt",
      createdAt: "CreatedAt",
    }
   );
  
   return equipments;
  
  }