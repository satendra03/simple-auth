import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

// Function to hash the password before saving it to the database, along with the salt
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return;
    return next();
  }

  const secret = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .createHmac("sha256", secret)
    .update(user.password)
    .digest("hex");

  user.salt = secret;
  user.password = hashedPassword;

  next();
});

// Function to check if the provided password matches the hashed password stored in the database
//  userSchema.methods.validatePassword = function (password) {
//   const user = this;
//   const hashedPassword = crypto
//    .createHmac("sha256", user.salt)
//    .update(password)
//    .digest("hex");

//   return user.password === hashedPassword;
// };

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) return false;
  const hashedPassword = crypto
    .createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (user.password === hashedPassword) console.log("Password Matched");
  else console.log("Not Match");
  return user.password === hashedPassword;
});

const Users = mongoose.model("User", userSchema);
export default Users;
