import * as mongoose from "mongoose";

/*
Id: any type of unique id
Status: "Queued" | "In Progress" | "Success" | "Failure"
RepositoryName: string
Findings: JSONB, see example
QueuedAt: timestamp
ScanningAt: timestamp
FinishedAt: timestamp

  uniqueId: {
    type: String,
    required: true,
    default: () => nanoid(7),
    index: { unique: true },
  },

*/

const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  status: {
    type: String,
    enum: ["Queued", "In Progress", "Success", "Failure"],
    default: "Queued",
  },
  repositoryName: String,
  findings: String,
  queuedAt: {
    type: Date,
    default: Date.now(),
  },
  scanningAt: Date,
  finishedAt: Date,
});

export { ResultSchema };
