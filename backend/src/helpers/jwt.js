import JWT from "jsonwebtoken";
import Boom from "boom";

// Tạo access token dựa trên data truyền vào
const signAccessToken = (data) => {
	return new Promise((resolve, reject) => {
		const payload = {
			...data,  // dữ liệu user, quyền, hoặc thông tin khác được mã hóa vào token
		};

		const options = {
			expiresIn: "10d",      // thời gian token có hiệu lực 10 ngày
			issuer: "ecommerce.app",  // người phát hành token
		};

		// Tạo JWT với secret key trong biến môi trường
		JWT.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(Boom.internal());  // lỗi server nếu tạo token thất bại
			}

			resolve(token);  // trả về token nếu thành công
		});
	});
};

// Middleware xác thực access token trong header 'authorization'
const verifyAccessToken = (req, res, next) => {
	const authorizationToken = req.headers["authorization"];
	if (!authorizationToken) {
		next(Boom.unauthorized());  // nếu không có token, trả lỗi 401
	}

	// Kiểm tra tính hợp lệ của token với secret
	JWT.verify(authorizationToken, process.env.JWT_SECRET, (err, payload) => {
		if (err) {
			// Nếu token lỗi hoặc hết hạn, trả lỗi Unauthorized
			return next(
				Boom.unauthorized(
					err.name === "JsonWebTokenError" ? "Unauthorized" : err.message
				)
			);
		}

		req.payload = payload;  // lưu payload decode được vào request để dùng tiếp
		next();  // chuyển sang middleware hoặc route handler tiếp theo
	});
};

// Tạo refresh token cho user với thời hạn dài hơn access token
const signRefreshToken = (user_id) => {
	return new Promise((resolve, reject) => {
		const payload = {
			user_id,  // mã user được mã hóa trong refresh token
		};
		const options = {
			expiresIn: "180d",      // thời gian hiệu lực 180 ngày
			issuer: "ecommerce.app",
		};

		JWT.sign(payload, process.env.JWT_REFRESH_SECRET, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(Boom.internal());
			}

			// Thường lưu token này vào Redis để quản lý (đoạn code comment)
			// redis.set(user_id, token, "EX", 180 * 24 * 60 * 60);

			resolve(token);
		});
	});
};

// Kiểm tra refresh token có hợp lệ không
const verifyRefreshToken = async (refresh_token) => {
	return new Promise(async (resolve, reject) => {
		JWT.verify(
			refresh_token,
			process.env.JWT_REFRESH_SECRET,
			async (err, payload) => {
				if (err) {
					return reject(Boom.unauthorized());  // token không hợp lệ hoặc hết hạn
				}

				const { user_id } = payload;
				// Lấy token lưu trên Redis để đối chiếu (comment)
				// const user_token = await redis.get(user_id);

				// Kiểm tra token có trùng khớp với token trong Redis (comment)
				// if (!user_token) {
				// 	return reject(Boom.unauthorized());
				// }

				// if (refresh_token === user_token) {
				// 	return resolve(user_id);
				// }
			}
		);
	});
};

export {
	signAccessToken,
	verifyAccessToken,
	signRefreshToken,
	verifyRefreshToken,
};
