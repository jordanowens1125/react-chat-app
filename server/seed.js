const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/db");
const saltRounds = 10;
const seedUsers = require("./seedFolder/users");


const seedDB = async () => {
  try {
    const usersWithHashedPasswordsPromiseArray = seedUsers.map(async (user) => {
      let hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
      return user;
    });

    const usersWithHashedPasswords = await Promise.all(
      usersWithHashedPasswordsPromiseArray
    );

    await connectDB();
    await User.deleteMany({});
    await User.insertMany(usersWithHashedPasswords);
  } catch (err) {
    console.log(err);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
