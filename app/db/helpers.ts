import mongoose, { Schema } from "mongoose";

const uri = `${process.env.MONGODB_URL}`;

export async function dbConnect() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(uri, {
      retryWrites: true,
      w: "majority",
    });
  }

  return;
}

export function initializeModel<ModelType>(modelName: string, schema: Schema) {
  type Doc = ModelType & Document;

  if (mongoose.models[modelName]) {
    return mongoose.model<Doc>(modelName);
  }

  return mongoose.model<Doc>(modelName, schema);
}
