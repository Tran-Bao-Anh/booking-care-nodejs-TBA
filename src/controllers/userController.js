import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email; //req.body.email là dữ liệu trong form login bên front end(react) (data từ client gửi qua server) do truyền qua rout "/api/login" trong file web.js
  let password = req.body.password;

  if (!email || !password) {
    //1 api sẽ trả ra một status là res.status thay vì 1 file ejs (res.render(".ejs")) hoặc 1 chuỗi string res.send("message")
    //khi gặp lỗi sẽ trả ra status(trạng thái) 500. sau đó trả ra 1 chuỗi json
    //.status(500): thiết lập mã trạng thái HTTP của phản hồi thành 500, có nghĩa là "Internal Server Error" (Lỗi nội bộ của máy chủ). Đây là mã trạng thái tiêu chuẩn khi có vấn đề trong xử lý của server.
    //.json({...}): Gửi phản hồi dưới dạng json. JSON là một định dạng dữ liệu phổ biến để truyền thông tin giữa server và client
    //ý nghĩa: giúp server thông báo chi tiết lỗi cho client theo cách chuẩn hóa. Dễ debug và xử lý các tình huống lỗi trong ứng dụng
    return res.status(500).json({
      errCode: 1, //mã lỗi thông báo cho client
      message: "Missing input parameter!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  console.log(userData);
  //check email exist
  //compare password
  //return userInfo
  //access_token: json web token(JWT)
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //all, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUser: handleDeleteUser,
  handleEditUser: handleEditUser,
};
