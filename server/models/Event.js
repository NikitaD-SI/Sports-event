// models/events.js
module.
exports = function (sequelize, DataTypes) {
  const { v4: uuidv4 } = require('uuid');
  const events = sequelize.define(
    'Events',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: function (){ return uuidv4() }
      },
      
      venue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      endTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Requested: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      RequestedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ApprovedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Approved: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      empid: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      updatedAt: "UpdatedAt",
      createdAt: "CreatedAt",
    }
  );
  events.beforeCreate((event, options) => {
    event.id = uuidv4();
  });

  return events;

}