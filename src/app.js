import express from "express";
import config from "./config/config.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cors from "cors";

//import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use("/api", uploadRoutes);
  }

  start() {
    const port = config.port;
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const app = new App();
app.start();
