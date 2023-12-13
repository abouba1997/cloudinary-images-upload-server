import dotenv from "dotenv";

class Config {
  constructor() {
    dotenv.config();
  }

  get cloudinaryConfig() {
    return {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    };
  }

  get databaseConfig() {
    return {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    };
  }

  get port() {
    return process.env.PORT || 5555;
  }
}

export default new Config();
