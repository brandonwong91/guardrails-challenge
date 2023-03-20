import * as express from "express";
import * as mongoose from "mongoose";

class App {
  public app: express.Application;
  public mongoUrl: string;

  constructor() {
    this.app = express();

    this.mongoUrl = "mongodb://localhost/gql";
    this.mongoSetup();
  }

  private mongoSetup(): void {
    mongoose
      .connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => {
        console.log("mongodb connected");
      })
      .catch((err) => {
        console.log("mongo error in connection:", err);
      });
  }
}

export default new App().app;
