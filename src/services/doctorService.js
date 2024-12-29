import { where } from "sequelize";
import db from "../models/index";

let getTopDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,  // giới hạn kết quả truy vấn
        where: { roleId: "R2" }, //truy vấn tại các user có roleId: 'R2'
        order: [["createdAt", "DESC"]], //sắp xếp các user được truy vấn theo ngày tạo "createdAt", lấy thằng vừa tạo lên trước
        attributes: {   
          exclude: ["password"],    //bỏ trường password
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
        //nếu reject thì sẽ chạy ngay vào catch trong hàm getTopDoctorHome trong file doctorController.js
      reject(e);
    }
  });
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
};
