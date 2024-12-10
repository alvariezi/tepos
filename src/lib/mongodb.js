import mongoose from "mongoose";

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB sudah terhubung.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Berhasil terhubung ke MongoDB.");
  } catch (error) {
    console.error("Gagal terhubung ke MongoDB:", error.message);
    throw new Error("Koneksi MongoDB gagal.");
  }
};
