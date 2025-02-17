"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //model User thuộc về model Allcode thì foreignKey sẽ được định nghĩa tại model User
      //1 user chỉ có 1 allcode, 1 allcode có nhiều user => quan hệ 1-nhiều
      //vì có nhiều foreignKey, nên để biết khi nào dùng cái nào thì phải có thêm as: "positionData",...
      User.belongsTo(models.Allcode, {
        foreignKey: "positionId",
        targetKey: "keyMap",
        as: "positionData",
      });
      User.belongsTo(models.Allcode, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderData",
      });
      //quan hệ 1-1, model user mà có 1 model markdown thì foreignKey sẽ được định nghĩa tại model Markdown
      User.hasOne(models.Markdown, { foreignKey: "doctorId" });
      User.hasOne(models.Doctor_Info, { foreignKey: "doctorId" });
      User.hasMany(models.Schedule, {
        foreignKey: "doctorId",
        as: "doctorData",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
