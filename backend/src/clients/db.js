import mongoose from 'mongoose';

mongoose
  .connect(process.env.MONGO_URI , { //kết nối tới cơ sở dữ liệu MongoDB
      //process.env.MONGO_URI lấy địa chỉ MongoDB từ biến môi trường trong file .env
    useNewUrlParser: true, // dùng trình phân tích URL mới để tránh lỗi cú pháp
    useUnifiedTopology: true, // dăng ổn định kết nối và tránh cảnh báo cũ
    useCreateIndex: true, // dùng createIndex thay cho ensureIndex đã lỗi thời, tạo index cho trường dữ liệu đúng
  })
  .then(() => console.log('MongoDB: Connectted')) //hiển thị thông báo kết nối thành công
  .catch((err) => console.log(err.message)); //bắt lỗi nếu không kết nối được


