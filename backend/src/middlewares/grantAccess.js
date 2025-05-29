import { roles } from '../roles';  // Import roles đã khai báo
import Boom from 'boom';           // Thư viện để trả lỗi HTTP

// Middleware kiểm tra quyền truy cập dựa trên action và resource
const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    // Lấy quyền của role hiện tại trên resource(tài nguyên: user, product,... tương ứng với action(hành động: đọc(readAny), tạo mới(createAny),...)
    const permission = roles.can(req.payload.role)[action](resource);

    // Nếu không được phép, trả về lỗi Unauthorized (401)
    // if (!permission.granted) {
    //   return next(Boom.unauthorized("You don't have permission."));
    // }

    // Nếu được phép, chuyển sang middleware tiếp theo hoặc handler
    next();
  };
};

export default grantAccess;
