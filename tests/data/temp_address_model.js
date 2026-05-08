const { DataTypes } = require("sequelize");
const sequelize = require("../../dbConnection");

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true, tableName: "address", modelName: "Address" }
);

Address.associate = function (models) {
  Address.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE", // delete aadhar when user is deleted
    constraints: false,
  });
};

module.exports = Address;
