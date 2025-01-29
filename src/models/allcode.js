"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Allcode có nhiều User thì foreignKey sẽ được định nghĩa tại model User
      //1 user chỉ có 1 allcode, 1 allcode có nhiều user => quan hệ 1-nhiều
      Allcode.hasMany(models.User, {foreignKey: 'positionId', as: 'positionData'})
      Allcode.hasMany(models.User, {foreignKey: 'gender', as: 'genderData'})
      Allcode.hasMany(models.Schedule, {foreignKey: 'timeType', as:'timeTypeData'})

      Allcode.hasMany(models.Doctor_Info, {foreignKey: 'priceId', as:'priceTypeData'})
      Allcode.hasMany(models.Doctor_Info, {foreignKey: 'provinceId', as:'provinceTypeData'})
      Allcode.hasMany(models.Doctor_Info, {foreignKey: 'paymentId', as:'paymentTypeData'})
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
