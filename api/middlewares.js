//토큰 검증 post만
import jwt from "jsonwebtoken";

export let verifyToken = (req, res, next) => {
  try {
    req.decode = jwt.verify(
      req.headers.cookie.split("=")[1],
      process.env.jwt_SECRET
    );
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다",
      });
    }
    console.log(req.headers.cookie);
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다",
    });
  }
};
