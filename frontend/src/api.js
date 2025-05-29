import axios from "axios";

// Thiết lập interceptor cho axios để tự động thêm token vào header authorization
axios.interceptors.request.use(
  function (config) {
    // Lấy domain (origin) từ url của request
    const { origin } = new URL(config.url);

    // Danh sách các domain backend được phép gửi token
    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
    // Lấy token lưu trong localStorage
    const token = localStorage.getItem("access-token");

    // Nếu request gửi đến backend hợp lệ thì thêm header authorization
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }
    return config;
  },
  function (error) {
    // Xử lý lỗi trước khi gửi request
    return Promise.reject(error);
  }
);

// Hàm lấy danh sách sản phẩm theo trang (pagination)
export const fetchProductList = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`
  );

  return data;
};

// Hàm lấy chi tiết một sản phẩm theo id
export const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`
  );

  return data;
};

// Hàm tạo mới sản phẩm, gửi dữ liệu product đến backend
export const postProduct = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/`,
    input
  );

  return data;
};

// Hàm đăng ký người dùng mới
export const fetcRegister = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,
    input
  );

  return data;
};

// Hàm đăng nhập người dùng
export const fetchLogin = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,
    input
  );

  return data;
};

// Hàm lấy thông tin người dùng hiện tại (dựa vào token)
export const fetchMe = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`
  );
  return data;
};

// Hàm đăng xuất, gửi refresh token để backend hủy phiên đăng nhập
export const fetchLogout = async () => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,
    {
      refresh_token: localStorage.getItem("refresh-token"),
    }
  );
  return data;
};

// Hàm tạo đơn hàng mới
export const postOrder = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/order`,
    input
  );
  return data;
};

// Hàm lấy danh sách đơn hàng
export const fetchOrders = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/order`
  );
  return data;
};

// Hàm xóa sản phẩm theo product_id
export const deleteProduct = async (product_id) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`
  );

  return data;
};

// Hàm cập nhật thông tin sản phẩm theo product_id
export const updateProduct = async (input, product_id) => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`,
    input
  );

  return data;
};
