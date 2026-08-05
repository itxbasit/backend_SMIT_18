import jwt from "jsonwebtoken"

export const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(404).send({ message: "You aren't authorized" });
    }

    const decode = jwt.verify(token, process.env.accessTokenKey)

    req.body = decode

    next()
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};
