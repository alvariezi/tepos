import adminCol from "@/models/admin";
import { connectMongoDB } from "@/lib/mongodb";

export const adminRegister = async (data) => {
  try {
    await connectMongoDB();
    const insert = new adminCol({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    await insert.save();
  } catch (error) {
    console.error("Error during admin registration:", error);
    throw new Error("Gagal registrasi admin.");
  }
};

export const existingAdmin = async (username) => {
  try {
    await connectMongoDB();
    return adminCol
      .find({ username })
      .select("username password");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};