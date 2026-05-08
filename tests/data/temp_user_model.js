const { DataTypes } = require("sequelize");
const sequelize = require("../../dbConnection");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true, tableName: "users", modelName: "User" }
);

User.associate = function (models) {
  User.hasOne(models.Aadhar, {
    foreignKey: "userId",
  });
};

module.exports = User;
