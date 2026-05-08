const { DataTypes } = require("sequelize");
const sequelize = require("../../dbConnection");

const Aadhar = sequelize.define(
  "Aadhar",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    aadharname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true, tableName: "aadhar", modelName: "Aadhar" }
);

Aadhar.associate = function (models) {
  Aadhar.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE", // delete aadhar when user is deleted
    constraints: false,
  });
};

module.exports = Aadhar;
