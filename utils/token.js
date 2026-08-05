import jwt from "jsonwebtoken";

export const accessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      role: user.role,
    },
    process.env.accessTokenKey,
    {
      expiresIn: "15m",
    },
  );
};

export const refreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      role: user.role,
    },
    process.env.refreshTokenKey,
    {
      expiresIn: "1d",
    },
  );
};
