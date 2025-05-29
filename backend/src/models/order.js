import mongoose from 'mongoose'; // Import thư viện mongoose để làm việc với MongoDB

const Schema = mongoose.Schema; // Tạo alias cho mongoose.Schema để dùng ngắn gọn hơn

// Định nghĩa schema cho đơn hàng
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,  // Liên kết đến người dùng bằng ID
    ref: 'user',                  // Tham chiếu tới model 'user'
  },
  adress: {
    type: String,                 // Địa chỉ giao hàng là kiểu chuỗi
    required: true,               // Bắt buộc phải có địa chỉ
  },
  items: [
    {
      type: Schema.Types.ObjectId,// Mỗi item là ID của sản phẩm
      ref: 'product',             // Tham chiếu tới model 'product'
    },
  ],
  createdAt: {
    type: Date,                   // Ngày tạo đơn hàng
    default: Date.now,            // Mặc định là thời điểm hiện tại
  },
});

const Order = mongoose.model('order', OrderSchema);

export default Order;
