import crypto from "crypto";

export const hashPassword = (password) => {
  if (!process.env.HELPER_SECRET) {
    throw new Error("HELPER_SECRET is not defined. Check your .env file.");
  }

  return crypto
    .createHmac("sha256", process.env.HELPER_SECRET)
    .update(password)
    .digest("hex");
};
