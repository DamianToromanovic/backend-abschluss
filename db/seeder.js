import User from "../models/userSchema.js";
import db from "./db.js";

await db.connect();
await User.deleteMany({});

const sampleUsers = [
  {
    name: "ABCcompany",
    email: "abccompany@example.com",
    password: "Test12345",
    role: "company",
  },
  {
    name: "Testcompany",
    email: "testcompany@example.com",
    password: "Abc12345",
    role: "company",
  },
  {
    name: "virtualcompany",
    email: "virtualcompany@example.com",
    password: "Virtual12345",
    role: "company",
  },
  {
    name: "fantasycompany",
    email: "abccompany@example.com",
    password: "Fantasy12345",
    role: "company",
  },
  {
    name: "123company",
    email: "123company@example.com",
    password: "Numbers12345",
    role: "company",
  },
  {
    name: "testuser",
    email: "testuser@example.com",
    password: "test12345",
    role: "applicant",
  },
  {
    name: "MaxMustermann",
    email: "maxmustermann@example.com",
    password: "MaxM12345",
    role: "applicant",
  },
];

await User.insertMany(sampleUsers);
console.log("Sample users inserted");
await db.close();
