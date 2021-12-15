const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("post", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },    
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roadMap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};