const mongoose = require("mongoose");
const User = require("../models/user");
const { faker } = require("@faker-js/faker");

const users = 40;

const seedUsers = [];

for (let i = 0; i < users; i++) {
  seedUsers.push(
    new User({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password({ length: 20 }),
      photoURL: faker.image.urlLoremFlickr({ category: "people" }),
    })
  );
}


seedUsers.push(
  new User({
    email: process.env.DEMO_EMAIL,
    name: "Demo",
    password: process.env.DEMO_PASSWORD,
    photoURL:
      "https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  })
);

module.exports = seedUsers;
