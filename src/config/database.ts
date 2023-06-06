import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export class MongoConnection {
  static connect() {
    mongoose
      .connect(
        process.env.MONGO_URI as string,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        } as any
      )
      .then(() => {
        console.log("Successfully connected to database")
      })
      .catch((err: Error) => {
        console.log("database connection failed. exiting now...")
        console.error(err)
        process.exit(1)
      })
  }
}
