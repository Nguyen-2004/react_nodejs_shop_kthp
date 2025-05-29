import AccessControl from 'accesscontrol';

// Tạo một đối tượng AccessControl để quản lý quyền
const ac = new AccessControl();

exports.roles = (function () {
  // Định nghĩa role 'user' có quyền đọc tất cả sản phẩm
  ac.grant('user').readAny('product');

  // Định nghĩa role 'admin' kế thừa quyền của 'user' và có thêm quyền tạo sản phẩm
  ac.grant('admin').extend('user').createAny('product');

  // Trả về đối tượng quản lý quyền để dùng ở nơi khác
  return ac;
})();
