import mongoose from "mongoose"

const { MONGO_URI } = process.env

const connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database")
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...")
      console.error(error)
      process.exit(1)
    })
}

export default connect
