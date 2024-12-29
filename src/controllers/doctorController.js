import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
    //limit là biến set giới hạn top bác sĩ hiện ra
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHome(+limit);    //+limit là chuyển từ limit từ string sang number
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    //status(200) là kết nối thành công
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
};
