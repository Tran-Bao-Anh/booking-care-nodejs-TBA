//file này để sửa type của image từ STRING thành longBLOB 
module.exports = {
  //hàm up sẽ chạy khi ta chạy câu lệnh npx sequelize-cli db:migrate
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Users", "image", {
        type: Sequelize.BLOB('long'), //BLOB có các kiểu tiny, long, medium, Nếu không đặt gì thì mặc định là tiny, vào sequelize data type để xem thêm
        allowNull: true,
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    //hàm down sẽ chạy khi ta chạy câu lệnh db rollback
    //dùng trong trường hợp làm lỗi thì có thể back lại
    return Promise.all([
      queryInterface.changeColumn("Users", "image", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};