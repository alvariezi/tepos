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
    console.log(error);
    throw Error(error);
  }
};

export const existingAdmin = async (username, email) => {
  try {
    await connectMongoDB();
    return adminCol
      .find({
        $or: [{ username: username }, { email: email }],
      })
      .select("_id");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};
