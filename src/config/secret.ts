import dotenv from "dotenv";

dotenv.config();

const secret = {
  PORT: process.env.PORT,
  dbUri: process.env.DB_URI,

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};

export default secret;
