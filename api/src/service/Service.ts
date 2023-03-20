import * as mongoose from "mongoose";
import { ResultSchema } from "../models/Model";

const Result = mongoose.model("Result", ResultSchema);

class Service {
  constructor() {}

  public addResult(request) {
    const { input } = request;
    return Result.create(input);
  }

  public findAllResults() {
    return Result.find({}).exec();
  }

  public findResultById(request) {
    return Result.findOne({ _id: request.id }).exec();
  }

  public updateResultById(request) {
    const { input } = request;
    const { id, repositoryName } = input;
    return Result.findOneAndUpdate(
      { _id: id },
      { repositoryName },
      {
        new: true,
      }
    ).exec();
  }

  deleteResultById(result) {
    return Result.remove({ _id: result.id }).exec();
  }
}

export { Service };
