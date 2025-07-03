import mongoose from "mongoose";

export default {
  connect: async () => {
    mongoose.connection.on("connected", () =>
      console.log(`Connected "${mongoose.connection.name}" `)
    );
    mongoose.connection.on("disconnected", () =>
      console.log(`Disconnected from "${mongoose.connection.name}" `)
    );
    mongoose.connection.on("error", (error) =>
      console.log(`"${mongoose.connection.name}" DB Error:`, error)
    );

    await mongoose.connect(process.env.MONGO_DB_URI);
  },
  close: async () => {
    await mongoose.disconnect();
  },
};
